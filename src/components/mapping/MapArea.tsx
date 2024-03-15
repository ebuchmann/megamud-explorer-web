import { useNavigate, useParams } from '@solidjs/router';
import { roomData } from '../../data';
import * as d3 from 'd3';
import { Accessor, createEffect, createSignal } from 'solid-js';
import { Direction } from '../../types';
// import { roomDataObj } from '../../data/roomsObj';

const directions: [string, ...number[]][] = [
  ['N', 0, -1, 0],
  ['NE', 1, -1, 0],
  ['E', 1, 0, 0],
  ['SE', 1, 1, 0],
  ['S', 0, 1, 0],
  ['SW', -1, 1, 0],
  ['W', -1, 0, 0],
  ['NW', -1, -1, 0],
  // ['U', 0, 0, 1],
  // ['D', 0, 0, -1],
];

const linePositions: [Direction, ...number[]][] = [
  ['N', 7, 0, 7, -4],
  ['S', 7, 14, 7, 18],
  ['E', 14, 7, 18, 7],
  ['W', 0, 7, -4, 7],
  ['NE', 13, 1, 18, -4],
  ['SW', 1, 13, -4, 18],
  ['NW', 1, 1, -4, -4],
  ['SE', 13, 13, 18, 18],
];

type MapProps = {
  drawDistance: Accessor<string>;
};

export function MapArea(props: MapProps) {
  const params = useParams();
  const navigate = useNavigate();
  const [mapNum, roomNum] = params.number.split('/');
  const [startingRoom, setStartingRoom] = createSignal(
    // roomDataObj[roomNum],
    roomData.find(
      (rm) => rm.MapNum === Number(mapNum) && rm.RoomNum === Number(roomNum),
    ),
  );

  type TraverseProps = {
    room: any;
    x: number;
    y: number;
    z: number;
    limit: number;
    svgGroup: any;
  };

  let lastTransform: string = '';

  const svg = d3.create('svg').attr('viewBox', [0, 0, 800, 800]);

  function handleZoom(e) {
    svg.select('g').attr('transform', e.transform);
    lastTransform = e.transform;
  }
  const zoom = d3.zoom().on('zoom', handleZoom);

  d3.select('body').on('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft': {
        if (startingRoom().W) {
          navigate(startingRoom().W!);
        }
        return;
      }
      case 'ArrowRight': {
        if (startingRoom().E) {
          navigate(startingRoom().E!);
        }
        return;
      }
      case 'ArrowDown': {
        if (startingRoom().S) {
          navigate(startingRoom().S!);
        }
        return;
      }
      case 'ArrowUp': {
        if (startingRoom().N) {
          navigate(startingRoom().N!);
        }
        return;
      }
    }
  });

  svg.call(zoom);

  let visited: Record<string, boolean> = {};

  function traverse({ room, x, y, z, limit, svgGroup }: TraverseProps) {
    if (
      Math.abs(x) > limit ||
      Math.abs(y) > limit ||
      visited[`${room.MapNum}-${room.RoomNum}`]
    )
      return;

    const roomGroup = svgGroup
      .append('g')
      .attr('transform', `translate(${x * 22},${y * 22})`);

    linePositions.forEach(([dir, x1, y1, x2, y2]) => {
      if (room[dir]) {
        const isWarp = room[dir]?.includes('WARP');
        roomGroup
          .append('line')
          .attr(
            'style',
            `stroke:${isWarp ? 'yellow' : 'black'};stroke-width:2;`,
          )
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2);
      }
    });

    roomGroup
      .append('rect')
      .attr('fill', 'black')
      .attr('width', 14)
      .attr('height', 14)
      .attr('class', x === 0 && y === 0 ? 'outline-dashed' : '')
      .on('click', () => {
        navigate(`${String(room.MapNum)}/${String(room.RoomNum)}`, {
          replace: true,
        });
      });

    visited[`${room.MapNum}-${room.RoomNum}`] = true;

    directions.forEach(([dir, nextX, nextY, nextZ]) => {
      if (!room[dir]) return;

      const [nextMapNum, nextRoomNum] = room[dir].split('/');
      const nextRoom = roomData.find(
        (rm) =>
          rm.MapNum === Number(nextMapNum) &&
          rm.RoomNum === Number(nextRoomNum),
      );

      if (nextRoom)
        traverse({
          room: nextRoom,
          x: x + nextX,
          y: y + nextY,
          z: z + nextZ,
          limit,
          svgGroup,
        });
    });
  }

  createEffect(() => {
    d3.select('g').remove();
    const svgGroup = svg.append('g');
    const limit = Number(props.drawDistance());

    if (lastTransform) svgGroup.attr('transform', lastTransform);

    const [mapNum, roomNum] = (params.number || '1/1').split('/');
    setStartingRoom(
      // roomDataObj[roomNum],
      roomData.find(
        (rm) => rm.MapNum === Number(mapNum) && rm.RoomNum === Number(roomNum),
      ),
    );

    visited = {};
    traverse({
      room: startingRoom(),
      x: 0,
      y: 0,
      z: 0,
      limit,
      svgGroup,
    });

    const limitWidth = limit * 48;
    const limitHeight = limit * 48;

    svgGroup
      .append('rect')
      .attr('width', limitWidth)
      .attr('height', limitHeight)
      .attr('z-index', -1)
      .attr(
        'transform',
        `translate(-${limitWidth / 2 - 10}, -${limitHeight / 2 - 10})`,
      )
      .attr('fill', 'none')
      .attr('class', 'outline-dotted');
  });

  return <div>{svg.node()}</div>;
}
