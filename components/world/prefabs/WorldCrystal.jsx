import { useBox } from "@react-three/cannon";
import { Text } from "./Text";
import { Description } from "./Description";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
export function WorldCrystal(props) {
  const meshRef = useRef();
  const loadingRef = useRef();
  const [balance, setBalance] = useState(props.balance);
  const [loading, setLoading] = useState(false);
  const { nodes, materials } = useGLTF("/crystal.glb");
  const [group] = useBox(() => ({
    mass: 500,
    args: [2, 2, 2],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
    type: "Kinematic",
  }));
  function refreshBalance() {
    clearTimeout();
    setLoading(true);
    setBalance(JSON.parse(localStorage.getItem("user")).energyBalance);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useFrame(({ clock }) => {
    if (props.animated) {
      meshRef.current.rotation.y += 0.0025;
    }
    if (loading) {
      loadingRef.current.rotation.y += 0.05;
    }
  });
  return (
    <group {...props} dispose={null} castShadow ref={group}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group ref={meshRef} onClick={refreshBalance}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pPlatonic1_lambert1_0.geometry}
              material={materials.lambert1}
            />
            {loading ? (
              <group ref={loadingRef}>
                <mesh position={[0, 3, 2.5]}>
                  <sphereGeometry args={[0.5, 1, 3]} />
                  <meshLambertMaterial color={"cyan"} />
                </mesh>
                <mesh position={[0, 3, -2.5]}>
                  <sphereGeometry args={[0.5, 1, 3]} />
                  <meshLambertMaterial color={"cyan"} />
                </mesh>
              </group>
            ) : (
              <>
                <Text position={[-1, 2.75, 1.75]} text={balance} />
                <Text
                  position={[1, 2.75, -1.75]}
                  rotation={[0, Math.PI, 0]}
                  text={balance}
                />
              </>
            )}
            <Description position={[-2, 5, 2]} text={"click to refresh"} />
            <Description
              position={[2, 5, -2]}
              rotation={[0, Math.PI, 0]}
              text={"click to refresh"}
            />
          </group>
        </group>
      </group>
    </group>
  );
}