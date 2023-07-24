import { ImageComponent } from "./components";
export default function GridImage(props: { component: ImageComponent }) {
  return (
    <img
      style={{ height: "100%", width: "100%" }}
      src={props.component.src}
      alt="placeholder"
    />
  );
}
