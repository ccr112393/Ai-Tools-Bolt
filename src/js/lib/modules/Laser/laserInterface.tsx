import { Icon } from "@adobe/react-spectrum";
import { LaserComponent, ModuleType } from "..";

export const LaserIcon = (
  <Icon>
    <svg width=".25in" height=".25in" viewBox="0 0 18 18">
      <rect x="11.25977" y="5.45782" width=".93829" height="3.14337" rx=".14398" ry=".14398" />
      <rect x="11.25977" y="14.85663" width=".93829" height="3.14337" rx=".14398" ry=".14398" />
      <path d="M11.72894,9.69592c-.39093,0-.75262.11578-1.06256.30701L.66351,0h-.66351v.66345l10.00293,10.00293c-.19122.30994-.30701.67163-.30701,1.06256,0,1.1228.91022,2.03296,2.03302,2.03296s2.03302-.91016,2.03302-2.03296-.91022-2.03302-2.03302-2.03302Z" />
      <rect x="14.85663" y="11.25977" width="3.14337" height=".93829" rx=".14398" ry=".14398" />
      <rect x="5.45789" y="11.25977" width="3.14331" height=".93829" rx=".14398" ry=".14398" />
      <rect x="13.57642" y="8.16902" width="2.48653" height=".93831" rx=".14402" ry=".14402" transform="translate(-1.76752 13.00916) rotate(-45)" />
      <rect x="7.39489" y="14.35051" width="2.48655" height=".93833" rx=".14398" ry=".14398" transform="translate(-7.94894 10.44836) rotate(-44.99888)" />
      <rect x="14.35053" y="13.57639" width=".93831" height="2.48653" rx=".14402" ry=".14402" transform="translate(-6.13849 14.81968) rotate(-45)" />
    </svg>
  </Icon>
);
export default LaserComponent;

export const LaserModule: ModuleType = {
  key: "lsr",
  name: "Laser Files",
  component: LaserComponent,
  icon: LaserIcon,
};
