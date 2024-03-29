import { Room } from "../../types";

const roomData: Room[] = [
  {
    MapNum: 11,
    RoomNum: 1,
    Name: "Crimson Chamber",
    N: ["11/35", "Text: go crimson, enter crimson, go crimson portal"],
    S: "11/2",
  },
  {
    MapNum: 11,
    RoomNum: 2,
    Name: "Crimson Passage",
    N: "11/1",
    E: "11/15",
    W: "11/3",
  },
  { MapNum: 11, RoomNum: 3, Name: "Crimson Passage", E: "11/2", W: "11/4" },
  { MapNum: 11, RoomNum: 4, Name: "Crimson Passage", E: "11/3", SW: "11/5" },
  { MapNum: 11, RoomNum: 5, Name: "Crimson Passage", E: "11/6", NE: "11/4" },
  { MapNum: 11, RoomNum: 6, Name: "Crimson Passage", E: "11/7", W: "11/5" },
  { MapNum: 11, RoomNum: 7, Name: "Crimson Passage", S: "11/8", W: "11/6" },
  { MapNum: 11, RoomNum: 8, Name: "Crimson Passage", N: "11/7", E: "11/9" },
  {
    MapNum: 11,
    RoomNum: 9,
    Name: "Crimson Passage",
    E: "11/10",
    S: "11/16",
    W: "11/8",
  },
  { MapNum: 11, RoomNum: 10, Name: "Crimson Passage", N: "11/11", W: "11/9" },
  { MapNum: 11, RoomNum: 11, Name: "Crimson Passage", E: "11/12", S: "11/10" },
  { MapNum: 11, RoomNum: 12, Name: "Crimson Passage", E: "11/13", W: "11/11" },
  { MapNum: 11, RoomNum: 13, Name: "Crimson Passage", W: "11/12", NW: "11/14" },
  { MapNum: 11, RoomNum: 14, Name: "Crimson Passage", W: "11/15", SE: "11/13" },
  { MapNum: 11, RoomNum: 15, Name: "Crimson Passage", E: "11/14", W: "11/2" },
  {
    MapNum: 11,
    RoomNum: 16,
    Name: "Stone Chamber",
    N: "11/9",
    E: "11/27",
    W: "11/17",
    D: "11/41",
  },
  { MapNum: 11, RoomNum: 17, Name: "Ebony Passage", E: "11/16", W: "11/18" },
  { MapNum: 11, RoomNum: 18, Name: "Ebony Passage", E: "11/17", W: "11/19" },
  { MapNum: 11, RoomNum: 19, Name: "Ebony Passage", E: "11/18", S: "11/20" },
  { MapNum: 11, RoomNum: 20, Name: "Ebony Passage", N: "11/19", E: "11/21" },
  { MapNum: 11, RoomNum: 21, Name: "Ebony Passage", S: "11/22", W: "11/20" },
  { MapNum: 11, RoomNum: 22, Name: "Ebony Passage", N: "11/21", S: "11/24" },
  { MapNum: 11, RoomNum: 23, Name: "Ebony Passage", E: "11/22" },
  { MapNum: 11, RoomNum: 24, Name: "Ebony Passage", N: "11/22", W: "11/25" },
  { MapNum: 11, RoomNum: 25, Name: "Ebony Passage", E: "11/24", W: "11/26" },
  {
    MapNum: 11,
    RoomNum: 26,
    Name: "Ebony Chamber",
    E: "11/25",
    W: ["11/35", "Text: go ebony, enter ebony, go ebony portal"],
  },
  { MapNum: 11, RoomNum: 27, Name: "Golden Passage", E: "11/28", W: "11/16" },
  { MapNum: 11, RoomNum: 28, Name: "Golden Passage", E: "11/29", W: "11/27" },
  { MapNum: 11, RoomNum: 29, Name: "Golden Passage", S: "11/30", W: "11/28" },
  { MapNum: 11, RoomNum: 30, Name: "Golden Passage", N: "11/29", W: "11/31" },
  { MapNum: 11, RoomNum: 31, Name: "Golden Passage", E: "11/30", S: "11/32" },
  { MapNum: 11, RoomNum: 32, Name: "Golden Passage", N: "11/31", S: "11/33" },
  { MapNum: 11, RoomNum: 33, Name: "Golden Passage", N: "11/32", E: "11/36" },
  {
    MapNum: 11,
    RoomNum: 34,
    Name: "Golden Chamber",
    E: ["11/35", "Text: go golden, enter golden, go golden portal"],
    W: "11/36",
  },
  {
    MapNum: 11,
    RoomNum: 35,
    Name: "Portal Room",
    N: ["11/1", "Text: go crimson, enter crimson, go crimson portal"],
    E: ["11/34", "Text: go golden, enter golden, go golden portal"],
    S: "1/488",
    W: ["11/26", "Text: go ebony, enter ebony, go ebony portal"],
  },
  { MapNum: 11, RoomNum: 36, Name: "Golden Passage", E: "11/34", W: "11/33" },
  { MapNum: 11, RoomNum: 37, Name: "Portal Room", S: "11/35" },
  { MapNum: 11, RoomNum: 38, Name: "Portal Room", N: "11/35" },
  { MapNum: 11, RoomNum: 39, Name: "Crimson Passage", N: "11/2" },
  { MapNum: 11, RoomNum: 40, Name: "Portal Room", W: ["11/35", "Text: "] },
  {
    MapNum: 11,
    RoomNum: 41,
    Name: "Blood-Soaked Tunnel",
    S: "11/42",
    U: ["11/16", "Hidden/Searchable"],
  },
  { MapNum: 11, RoomNum: 42, Name: "Room Of Chains", N: "11/41" },
  { MapNum: 11, RoomNum: 43, Name: "Stone Chamber" },
  { MapNum: 11, RoomNum: 44, Name: "Ebony Passage", E: "11/19" },
  { MapNum: 11, RoomNum: 45, Name: "Crimson Passage", E: "17/3250" },
];

export default roomData;
