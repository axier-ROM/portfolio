declare module 'troika-three-text' {
  import { Mesh, MeshStandardMaterial, Vector3, Quaternion } from 'three';

  export class Text extends Mesh {
    text: string;
    fontSize: number;
    color: string;
    anchor: string;
    font: string;
    material: MeshStandardMaterial;
    position: Vector3;
    quaternion: Quaternion;
    sync(): void;
    dispose(): void;
  }
}
