import { Color, Flex, ColorPicker, ColorSlider, ColorField } from "@adobe/react-spectrum";

interface RGBColorPickerProps {
    label?: string;
    colorValue: Color;
    setColorValue: (color: Color) => void;
}
export function RGBColorPicker({ label, colorValue, setColorValue }: RGBColorPickerProps) {
    const space = "rgb";


    return (
        <Flex direction={"column"}>

            {label && (
                <label className="customFieldLabel">{label}</label>
            )}
            <ColorPicker value={colorValue}>
                <Flex direction={"column"} justifyContent={"space-between"} gap={"size-100"}>
                    <ColorSlider key={"red"} channel={"red"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <ColorSlider key={"green"} channel={"green"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <ColorSlider key={"blue"} channel={"blue"} colorSpace={space} value={colorValue} onChange={setColorValue} />
                    <Flex direction={"row"} justifyContent={"space-between"} width={"size-2400"} gap={"size-100"}>
                        <ColorField label="Red" channel="red" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                        <ColorField label="Green" channel="green" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                        <ColorField label="Blue" channel="blue" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
                    </Flex>
                </Flex>
            </ColorPicker>
        </Flex>
    );

}
