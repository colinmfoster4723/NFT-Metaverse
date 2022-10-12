import { Crystal } from "./prefabs/Crystal";
import { Canvas } from "@react-three/fiber";
import {
  Detailed,
  OrbitControls,
  Stats,
  TransformControls,
} from "@react-three/drei";

import { GroundPlane } from "./prefabs/GroundPlane";
import { Lights } from "./prefabs/Lights";
import { Trees } from "./prefabs/Trees";
import { Skybox } from "./prefabs/Skybox";

import { Player } from "./prefabs/Player";
import { Physics, Debug } from "@react-three/cannon";
import { useRef } from "react";
import { Player2 } from "./prefabs/Player2";

export default function World(props) {
  const testing = true;
  return (
    <Canvas shadows flat>
      {testing && (
        <>
          <axesHelper args={[2]} />
          <Stats />
          {/* <gridHelper args={[1000, 1000]} /> */}
        </>
      )}
      <Lights />
      <Skybox />
      <Physics
        gravity={[0, -50, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        <Debug color={"black"} scale={1.1}>
          <GroundPlane />
          <Crystal
            position={[3, 3, 2]}
            scale={0.5}
            animated
            isTesting={testing}
          />

          <Trees count={50} boundary={50} />

          <Player />
        </Debug>
      </Physics>
      <fogExp2 attach="fog" args={[0xffffff, 0.055]} />
    </Canvas>
  );
}
