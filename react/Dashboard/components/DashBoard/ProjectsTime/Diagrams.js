import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import {RadialChart} from "react-vis";

const Diagrams = () => {
    const options1 = {
			animationEnabled: true,
			exportEnabled: false,
			backgroundColor: '#f3f3f3',
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: ""
			},
			width: 400,
			height: 300,
			data: [{
				type: "pie",
				indexLabelPlacement: "inside",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: [
					{ y: 20, label: "Airfare" },
					{ y: 24, label: "Food & Drinks" },
					{ y: 20, label: "Accomodation" },
					{ y: 14, label: "Transportation" },
					{ y: 12, label: "Activities" },
					{ y: 10, label: "Misc" }
				]
			}]
		}
		// const myData = [{angle: 1, label:"test"}, {angle: 5}, {angle: 2}]
    return (
        <div className="diagram">
            <CanvasJSChart options = {options1}/>
            <CanvasJSChart options = {options1}/>
			{/*<RadialChart*/}
			{/*	data={myData}*/}
			{/*	width={300}*/}
			{/*	height={300} />*/}
        </div>
    );
};

export default Diagrams;