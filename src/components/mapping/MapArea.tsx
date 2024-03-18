import { useNavigate, useParams } from '@solidjs/router';
import * as d3 from 'd3';
import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import { Direction, Room } from '../../types';
import { getRoom } from '../../utils/rooms';

const ROOM_SIZE = 15;
const ROOM_OFFSET = 22;
const CENTER_OFFSET = 200;

const directions: [Direction, ...number[]][] = [
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
  ['S', 7, ROOM_SIZE, 7, 18],
  ['E', ROOM_SIZE, 7, 18, 7],
  ['W', 0, 7, -4, 7],
  ['NE', 13, 1, 18, -4],
  ['SW', 1, 13, -4, 18],
  ['NW', 1, 1, -4, -4],
  ['SE', 13, 13, 18, 18],
];

type TraverseProps = {
  room: Room;
  x: number;
  y: number;
  z: number;
  limit: number;
  svgGroup: d3.Selection<SVGGElement, undefined, null, undefined>;
};

type MapProps = {
  drawDistance: Accessor<string>;
};

export function MapArea(props: MapProps) {
  let containerRef: HTMLDivElement;
  const params = useParams();
  const navigate = useNavigate();
  const [startingRoom, setStartingRoom] = createSignal(getRoom(params.number));

  let lastTransform: string = '';

  const svg = d3
    .create('svg')
    .attr('class', 'h-[100%]')
    .attr('preserveAspectRatio', 'xMinYMin meet');

  function handleZoom(e) {
    svg.select('g').attr('transform', e.transform);
    lastTransform = e.transform;
  }
  const zoom = d3.zoom().on('zoom', handleZoom);

  onCleanup(() => {
    d3.select('body').on('keydown', null);
  });

  const handleMoveDirection = (direction: Direction) => {
    if (startingRoom()?.[direction]) navigate(startingRoom()?.[direction]!);
  };

  d3.select('body').on('keydown', (e) => {
    switch (e.key) {
      case 'Numpad4':
      case 'ArrowLeft':
      case 'a':
        return handleMoveDirection('W');
      case 'Numpad6':
      case 'ArrowRight':
      case 'd':
        return handleMoveDirection('E');
      case 'Numpad2':
      case 'ArrowDown':
      case 'x':
        return handleMoveDirection('S');
      case 'ArrowUp':
      case 'Numpad8':
      case 'w':
        return handleMoveDirection('N');
      case 'Numpad9':
      case 'e':
        return handleMoveDirection('NE');
      case 'Numpad3':
      case 'c':
        return handleMoveDirection('SE');
      case 'Numpad1':
      case 'z':
        return handleMoveDirection('SW');
      case 'Numpad7':
      case 'q':
        return handleMoveDirection('NW');
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

    // Each room's containing group
    const roomGroup = svgGroup
      .append('g')
      .attr(
        'transform',
        `translate(${x * ROOM_OFFSET - ROOM_SIZE / 2},${y * ROOM_OFFSET - ROOM_SIZE / 2})`,
      );

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

    // Each room
    roomGroup
      .append('rect')
      .attr('fill', 'black')
      .attr('width', ROOM_SIZE)
      .attr('height', ROOM_SIZE)
      .attr('class', x === 0 && y === 0 ? 'outline-dashed' : '')
      .on('click', () => {
        navigate(`${String(room.MapNum)}/${String(room.RoomNum)}`, {
          replace: true,
        });
      });

    if (room.LairMax) {
      roomGroup
        .append('text')
        .text(room.LairMax)
        .attr('fill', 'white')
        .attr('class', 'text-xs pointer-events-none')
        .attr('transform', 'translate(4, 11)');
    }

    visited[`${room.MapNum}-${room.RoomNum}`] = true;

    directions.forEach(([dir, nextX, nextY, nextZ]) => {
      if (!room || !room[dir]) return;

      const nextRoom = getRoom(room[dir]!);

      if (nextRoom.MapNum !== startingRoom().MapNum) return;

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
    const width = containerRef.clientWidth;
    const height = containerRef.clientHeight;
    svg.attr('viewBox', [-width / 2, -height / 2, width, height]);
    d3.select('g').remove();
    const svgGroup = svg.append('g');
    const limit = Number(props.drawDistance());

    if (lastTransform) svgGroup.attr('transform', lastTransform);

    setStartingRoom(getRoom(params.number));

    const limitWidth = ROOM_OFFSET * (limit * 2 + 1);
    const limitHeight = ROOM_OFFSET * (limit * 2 + 1);

    // Draw distance outline
    svgGroup
      .append('rect')
      .attr('width', limitWidth)
      .attr('height', limitHeight)
      .attr('z-index', -1)
      .attr('transform', `translate(-${limitWidth / 2}, -${limitHeight / 2})`)
      .attr('fill', 'currentColor')
      .attr('class', 'text-slate-600 outline-dotted');

    visited = {};
    traverse({
      room: startingRoom()!,
      x: 0,
      y: 0,
      z: 0,
      limit,
      svgGroup,
    });
  });

  return (
    <div ref={containerRef!} class="h-[100%] overflow-hidden">
      {svg.node()}
    </div>
  );
}
