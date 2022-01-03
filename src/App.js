import React, {useState, useEffect} from 'react';
import {Stage, Layer, Rect, Text} from 'react-konva';

const App = () => {


    useEffect(() => {
        if (localStorage.getItem('table_system') !== null) {
            setRects(JSON.parse(localStorage.getItem('table_system')));
            setKey(rects.length + Math.floor(Math.random() * 150));
        } else {
            localStorage.setItem('table_system', [])
        }

    }, [])

    const initialRect = {
        x: 20,
        y: 50,
        width: 100,
        height: 100,
        fill: "#812c2c",
        draggable: true,
        shadowBlur: 10
    }
    const [key, setKey] = useState(0);
    const [rects, setRects] = useState([]);
    const [selectedRect, setSelectedRect] = useState(null);
    const [color, setColor] = useState(null);
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const addRect = () => {
        setKey((prevState) => (prevState + 1));
        setRects([...rects, {id: key, ...initialRect}])
    }

    const setDrag = (e) => {
        console.log(e);
        let onerect = rects.filter(rect => rect.id === e.target.attrs.id);
        onerect[0].x = e.target.x();
        onerect[0].y = e.target.y();
        const otherrect = rects.filter(item => item.id !== e.target.attrs.id);
        setRects([...otherrect, onerect[0]])
    }

    const save = () => {
        localStorage.setItem('table_system', JSON.stringify(rects));
        console.log("save");
    }

    const changeColor = (e) => {
        let onerect = rects.filter(rect => rect.id === selectedRect);
        onerect[0].fill = e.target.value;
        const otherrect = rects.filter(item => item.id !== selectedRect);
        setRects([...otherrect, onerect[0]])
    }

    const changeHeight = (e) => {
        let onerect = rects.filter(rect => rect.id === selectedRect);
        onerect[0].height = e.target.value;
        const otherrect = rects.filter(item => item.id !== selectedRect);
        setRects([...otherrect, onerect[0]])
    }

    const changeWidth = (e) => {
        let onerect = rects.filter(rect => rect.id === selectedRect);
        onerect[0].width = e.target.value;
        const otherrect = rects.filter(item => item.id !== selectedRect);
        setRects([...otherrect, onerect[0]])
    }

    return (
        <div style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <div>
                <button onClick={addRect}>Add Rect</button>
                <button onClick={save}>Save</button>
            </div>
            {selectedRect !== null ?
                <div style={{width: '100%'}}>
                    <table>
                        <tr>
                            <td>Seçilen Rect = {selectedRect}</td>
                            <td>Renk : <input value={color} onChange={e => changeColor(e)} type={"color"}/></td>
                            <td>Genişlik : <input value={width} onChange={e => {
                                changeWidth(e);
                                setWidth(e.target.value)
                            }} type={"number"}/></td>
                            <td>Yükseklik : <input value={height} onChange={e => {
                                changeHeight(e);
                                setHeight(e.target.value)
                            }} type={"number"}/></td>
                        </tr>
                    </table>
                </div>
                : null}
            <Stage width={800} height={800} style={{backgroundColor: '#eaeaea', maxWidth: 800}}>
                <Layer>
                    {rects.length > 0 && rects.map(rect => {
                        return <Rect onClick={e => {
                            setSelectedRect(e.target.attrs.id);
                            setColor(e.target.attrs.fill);
                            setWidth(e.target.attrs.width);
                            setHeight(e.target.attrs.height);
                        }
                        } {...rect} onDragEnd={e => setDrag(e)}/>;
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

export default App;

