import { Detailed } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Tree1 } from "./trees/Tree1";
import { Tree2 } from "./trees/Tree2";
import { Tree3 } from "./trees/Tree3";
import { Tree4 } from "./trees/Tree4";
import { Tree5 } from "./trees/Tree5";
import { Tree6 } from "./trees/Tree6";
import { Tree7 } from "./trees/Tree7";
import { Tree8 } from "./trees/Tree8";

export function Trees(props) {
  const { count, boundary, type, noClip } = props;
  const parentPosition = props.position || [0, 0, 0];
  const [trees, setTrees] = useState([]);
  const { camera, scene } = useThree();

  function TreeType(TreeProps) {
    let { pos, reward } = TreeProps;
    const rotationY = Math.PI / pos[0] / pos[2];
    const types = {
      1: (
        <Tree1
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      2: (
        <Tree2
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      3: (
        <Tree3
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      4: (
        <Tree4
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      5: (
        <Tree5
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      6: (
        <Tree6
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      7: (
        <Tree7
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
      8: (
        <Tree8
          position={pos}
          rotY={rotationY}
          reward={reward}
          noClip={noClip}
        />
      ),
    };
    return types[type];
  }
  function boxIntersects(
    minAx,
    minAz,
    maxAx,
    maxAz,
    minBx,
    minBz,
    maxBx,
    maxBz
  ) {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  }

  function isOverlapping(index, tree, trees) {
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.x - trees[i].box / 2;
      let maxChildZ = trees[i].position.x + trees[i].box / 2;
      if (
        boxIntersects(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        return true;
      }
    }
    return false;
  }

  function newPosition(box, boundary) {
    return (
      boundary / 2 -
      box / 2 -
      ((boundary - box) * Math.round(Math.random() * 100)) / 100
    );
  }

  function updatePosition(treeArr, boundary) {
    treeArr.forEach((tree, i) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(i, tree, treeArr));
    });
    setTrees(treeArr);
  }

  useEffect(() => {
    const tempTrees = [];
    for (let i = 0; i < count; i++) {
      tempTrees.push({
        position: { x: 0, y: 0 },
        box: 1,
      });
      updatePosition(tempTrees, boundary);
    }
  }, [boundary, count]);

  return (
    <group position={props.position}>
      {trees.map((tree, i) => (
        <Detailed
          key={i}
          distances={[0, 20]}
          position={[tree.position.x, 0, tree.position.z]}
          parent={scene}
        >
          <TreeType
            id={i}
            pos={[
              tree.position.x + parentPosition[0],
              0,
              tree.position.z + parentPosition[2],
            ]}
            reward={i === 2 ? true : false}
          />
          <mesh />
        </Detailed>
      ))}
    </group>
  );
}
