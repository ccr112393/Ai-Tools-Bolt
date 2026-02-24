import { Color, ColorPicker } from "@adobe/react-spectrum";

import { ColorSlider, ColorField } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

interface RGBColorPickerProps {
    label?: string;
    colorValue: Color;
    setColorValue: (color: Color) => void;
}
export function RGBColorPicker({ label, colorValue, setColorValue }: RGBColorPickerProps) {
    const space = "rgb";


    return (
        <div className={style({
            display: "flex",
            flexDirection: "column"
        })}>
            {label && (
                <label className="customFieldLabel">{label}</label>
            )}
            <ColorPicker value={colorValue}>
                <div
                    className={style({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 8
                    })}>
                    <ColorSlider key={"red"} channel={"red"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <ColorSlider key={"green"} channel={"green"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <ColorSlider key={"blue"} channel={"blue"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <div
                        className={style({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 192,
                            gap: 8
                        })}>
                        <ColorField label="Red" channel="red" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                        <ColorField label="Green" channel="green" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                        <ColorField label="Blue" channel="blue" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                    </div>
                </div>
            </ColorPicker>
        </div>
    );

}
