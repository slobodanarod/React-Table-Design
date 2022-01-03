import React, {useState, useEffect} from 'react';
import {Stage, Layer, Rect, Group, Text} from 'react-konva';

const App2 = () => {

    useEffect(() => {
        getFromStorage()
    }, [])

    const initialShape = {
        rect: {
            width: 100,
            height: 100,
            fill: "#812c2c",
            cornerRadius: 10
        },
        values: {
            x: 20,
            y: 50,
            draggable: true,
            zIndex: 1
        },
        text: {
            text: "Shape 1",
            fill: "white",
            fontSize: 25,
            padding: 2
        }
    }

    const [key, setKey] = useState(0);
    const [shapes, setShapes] = useState([]);
    const [selectedRect, setSelectedRect] = useState(null);
    const [color, setColor] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [text, setText] = useState("");
    const [textcolor, setTextColor] = useState(null);

    const addShape = () => {
        setKey((prevState) => (prevState + 1));
        setShapes([...shapes, {id: key, ...initialShape}])
    }


    const getFromStorage = () => {
        if (localStorage.getItem('table_system') !== null) {
            setShapes(JSON.parse(localStorage.getItem('table_system')));
            setKey(shapes.length + Math.floor(Math.random() * 150));
        } else {
            localStorage.setItem('table_system', []);
        }
    }

    const deleteShape = (e) => {
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect])
        setSelectedRect(null);
    }

    const copyShape = async () => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        setKey((prevState) => (prevState + 1));
        setShapes([...shapes, {...onerect[0], id: key}])
        setSelectedRect(null);
        await save();
        await getFromStorage();
    }

    const setDrag = (e) => {
        let onerect = shapes.filter(rect => rect.id === e.target.attrs.id);
        onerect[0].values.x = e.target.x();
        onerect[0].values.y = e.target.y();
        const otherrect = shapes.filter(item => item.id !== e.target.attrs.id);
        setShapes([...otherrect, onerect[0]]);
    }

    const save = () => {
        localStorage.setItem('table_system', JSON.stringify(shapes));
    }

    const changeColor = (e) => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        onerect[0].rect.fill = e.target.value;
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect, onerect[0]])
    }

    const changeTextColor = (e) => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        onerect[0].text.fill = e.target.value;
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect, onerect[0]])
    }

    const changeHeight = (e) => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        onerect[0].rect.height = e.target.value;
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect, onerect[0]])
    }

    const changeWidth = (e) => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        onerect[0].rect.width = e.target.value;
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect, onerect[0]])
    }

    const changeText = (e) => {
        let onerect = shapes.filter(rect => rect.id === selectedRect.id);
        onerect[0].text.text = e.target.value;
        const otherrect = shapes.filter(item => item.id !== selectedRect.id);
        setShapes([...otherrect, onerect[0]])
    }
    const clickShape = (e) => {
        setColor(e.target.attrs.fill);
        setWidth(e.target.attrs.width);
        setHeight(e.target.attrs.height);
        let onerect = shapes.filter(rect => rect.id === e.target.attrs.id);
        setSelectedRect(onerect[0]);
        setText(onerect[0].text.text);
    }


    return (
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div className={"m-2"}>
                <div className={"btn-group"}>
                    <button className={"btn btn-success"} onClick={addShape}>Add Shape</button>
                    <button className={"btn btn-primary"} onClick={save}>Save</button>
                </div>
            </div>

            <Stage width={800} height={800} style={{backgroundColor: '#eaeaea', maxWidth: 800}}>
                <Layer>
                    {shapes.length > 0 &&
                    shapes.map(shape => {
                        return (
                            <Group {...shape.values} id={shape.id}
                                   onDragEnd={e => setDrag(e)}
                                   onClick={e => {
                                       clickShape(e)
                                   }} draggable={true}>
                                <Rect id={shape.id} {...shape.rect} style={{border: "1px solid #ccc"}}/>
                                <Text {...shape.text} id={shape.id} zIndex={2}/>
                            </Group>)
                    })}
                </Layer>
            </Stage>
            {selectedRect !== null ?
                <div>
                    <table>
                        <tr>
                            <td>Color :</td>
                            <td><input value={color} onChange={e => changeColor(e)} type={"color"}/></td>
                        </tr>
                        <tr>
                            <td>Width :</td>
                            <td><input value={width} onChange={e => {
                                changeWidth(e);
                                setWidth(e.target.value)
                            }} type={"number"}/></td>
                        </tr>
                        <tr>
                            <td>Height :</td>
                            <td><input value={height} onChange={e => {
                                changeHeight(e);
                                setHeight(e.target.value)
                            }} type={"number"}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{textAlign: 'center'}}>
                                <div className={"btn btn-group"}>
                                    <button className={"btn btn-danger"} onClick={deleteShape}>Delete Shape</button>
                                    <button className={"btn btn-primary"} onClick={copyShape}>Copy Shape</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{textAlign: 'center'}}>Text</td>
                        </tr>
                        <tr>
                            <td>Text :</td>
                            <td><input value={text} onChange={e => {
                                changeText(e);
                                setText(e.target.value)
                            }} type={"text"}/></td>
                        </tr>
                        <tr>
                            <td>Color :</td>
                            <td><input value={textcolor} onChange={e => changeTextColor(e)} type={"color"}/></td>
                        </tr>
                    </table>
                </div>
                : null}
        </div>
    );
};

export default App2;

