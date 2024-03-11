import { createSignal } from 'solid-js';
import { roomData } from '../data/';
import * as d3 from 'd3';
import { Direction, Room } from '../types';
import { useNavigate } from '@solidjs/router';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { RoomPanel } from '../components/rooms/RoomPanel';

const getRoomColor = (room: Room) => {
  if (room.Shop) return 'silver';
  // if (room.NPC) return 'chocolate';

  return 'black';
};

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

export function RoomsPage() {
  const navigate = useNavigate();
  let lastNodeClicked: SVGElement;
  const [node, setSelectedNode] = createSignal();
  const svg = d3.create('svg').attr('viewBox', [0, 0, 800, 800]);
  const outerGroup = svg.append('g');
  // .attr(
  //   'transform',
  //   'translate(572.6762253231971,770.7017261242713) scale(0.7610166904196802)',
  // );

  function handleZoom(e) {
    svg.select('g').attr('transform', e.transform);
  }
  const zoom = d3.zoom().on('zoom', handleZoom);

  svg.call(zoom);

  roomData.forEach((room) => {
    const roomGroup = outerGroup
      .append('g')
      .attr('transform', `translate(${room.x * 22},${room.y * 22})`);

    roomGroup
      .append('rect')
      .attr('width', 14)
      .attr('height', 14)
      // .attr('x', room.x * 22)
      // .attr('y', room.y * 22)
      .attr('fill', room.RoomNum === 452 ? 'yellow' : getRoomColor(room))
      .on('click', (e) => {
        if (lastNodeClicked) lastNodeClicked.setAttribute('fill', 'black');
        e.target.setAttribute('fill', 'red');
        lastNodeClicked = e.target;
        setSelectedNode(room);
        navigate(`${String(room.MapNum)}/${String(room.RoomNum)}`, {
          replace: true,
        });
      });

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
  });

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="fixed bg-slate-700 text-xs">
          <pre>{JSON.stringify(node(), null, 2)}</pre>
        </div>
        {svg.node()}
      </MainPanel>
      <SidePanel>
        <RoomPanel />
      </SidePanel>
    </div>
  );
}
