import * as THREE from "three";
import { useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GlbFile from "@/assets/3dmodel/scene_1.glb";

export default function Intro1Compo({
  size,
}: {
  size: React.MutableRefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    // camera
    const camera = new THREE.PerspectiveCamera(
      70,
      size.current.clientWidth / size.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(`${theme.colors.container}`);

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size.current.clientWidth, size.current.clientHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    //Three.js에서 제공하는 카메라 컨트롤러 클래스
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0); // 카메라의 시선
    controls.update(); // 카메라 변화 업데이트

    // 조명
    const ambienttLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(ambienttLight);

    const light1 = new THREE.DirectionalLight(0x9d9dfb, 1);
    light1.position.set(9, 28, 5);
    light1.rotation.set(30, -9, 307);
    light1.scale.set(0.9, 0.9, 0.9);
    // 그림자 생성 및 설정
    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024 * 10; // 그림자 맵의 너비
    light1.shadow.mapSize.height = 1024 * 10; // 그림자 맵의 높이
    light1.shadow.radius = 4; // 그림자의 흐림 정도
    light1.shadow.bias = -0.001; // 그림자 편향
    // 그림자 맵이 투영되는 영역 설정
    light1.shadow.camera.left = -10; // 좌측 경계면
    light1.shadow.camera.right = 10; // 우측 경계면
    light1.shadow.camera.top = 10; // 상단 경계면
    light1.shadow.camera.bottom = -10; // 하단 경계면
    light1.shadow.camera.near = 0.1; // 가까운 경계면
    light1.shadow.camera.far = 50; // 먼 경계면

    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x9d9dfb, 0.3);
    light2.position.set(17, 34, 6);
    light2.rotation.set(33, -5, 145);
    light2.scale.set(0.8, 0.8, 0.8);

    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xebf3ff, 0.7);
    light3.position.set(14, 38, 4);
    light3.rotation.set(-5, 0, 492);
    light3.scale.set(0.8, 0.8, 0.8);

    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xebf3ff, 0.7);
    light4.position.set(10, 34, 5);
    light4.rotation.set(19, 0, 235);
    light4.scale.set(0.7, 0.7, 0.7);

    scene.add(light4);

    const light5 = new THREE.DirectionalLight(0xebf3ff, 1);
    light5.position.set(19, 37, 4);
    light5.rotation.set(-23, 15, 78);
    light5.scale.set(0.6, 0.6, 0.6);

    scene.add(light5);

    const sun1 = new THREE.DirectionalLight(0xfff, 1);
    sun1.position.set(33, 23, 6);
    sun1.rotation.set(19, 36, -131);
    sun1.scale.set(1, 1, 1);

    scene.add(sun1);

    const sun2 = new THREE.DirectionalLight(0xebf3ff, 1);
    sun2.position.set(33, 23, 6);
    sun2.rotation.set(20, 35, -129);
    sun2.scale.set(1, 1, 1);

    scene.add(sun2);

    // glTF 파일에서 압축된 데이터를 디코딩
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("jsm/libs/draco/gltf/"); // DRACO 디코더 파일의 경로

    // 에셋 추가
    let mixer = null;
    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      GlbFile,
      function (gltf) {
        const model = gltf.scene;

        // 로드된 모델의 위치, 크기, 회전 설정
        model.position.set(0, 0, 0);
        model.scale.set(7, 7, 7);
        model.rotation.set(0.6, 1, 0);

        const bbox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        model.position.sub(center);

        // scene에 모델 추가
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        mixer.clipAction(gltf.animations[1]).play();
        mixer.clipAction(gltf.animations[2]).play();
        mixer.clipAction(gltf.animations[3]).play();
        mixer.clipAction(gltf.animations[4]).play();
        mixer.clipAction(gltf.animations[5]).play();
        mixer.clipAction(gltf.animations[6]).play();
        mixer.clipAction(gltf.animations[7]).play();
        mixer.clipAction(gltf.animations[8]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      renderer.render(scene, camera);
    }
  }, []);

  return <Container id="container"></Container>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
