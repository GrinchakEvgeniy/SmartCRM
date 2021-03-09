import React, {useEffect, useState} from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import {RadialChart} from "react-vis";

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    // hours = (hours < 10) ? "0" + hours : hours;
    // minutes = (minutes < 10) ? "0" + minutes : minutes;
    // seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours;
}

const Diagrams = (props) => {
	// console.log(props)
	const [options1, setOptions1] = useState({});
	const [options2, setOptions2] = useState({});

	const allTimeInit = () => {
		let time = 0;
		for (let i = 0; i < props.allTime.length; i++){
			let finish = props.allTime[i].finish;
			if (finish == null){ finish = Date.now()}
			time += parseInt(finish) - parseInt(props.allTime[i].start);
		}
		let time_success = 0;
		if(time !== 0){
			time_success = msToTime(time) / props.project.project_predict_time * 100;
		}
		setOptions1({
			animationEnabled: true,
			exportEnabled: false,
			backgroundColor: '#f3f3f3',
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Project Time"
			},
			width: 400,
			height: 300,
			data: [{
				type: "pie",
				indexLabelPlacement: "inside",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: [
					{ y: time_success, label: "Spent time" },
					{ y: 100 - time_success, label: "Time left" },
				]
			}]
		})
	}

	const userTimeInit = () => {
		let time = 0;
		for (let i = 0; i < props.today.length; i++){
			let finish = props.today[i].finish;
			if (finish == null){ finish = Date.now()}
			time += parseInt(finish) - parseInt(props.today[i].start);
		}
		const result = [];
		props.users.forEach((value)=>{
			let time_user = 0;
			for(let i = 0; i < props.today.length; i++){
				if(value.id == props.today[i].user_id){
					let finish = props.today[i].finish;
					if (finish == null){ finish = Date.now()}
					time_user += parseInt(finish) - parseInt(props.today[i].start);
				}
			}
			result.push({
				y: time_user == 0 ? 0 : time_user / time * 100,
				label: value.username
			})
		})
		setOptions2({
			animationEnabled: true,
			exportEnabled: false,
			backgroundColor: '#f3f3f3',
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Users Time Today"
			},
			width: 400,
			height: 300,
			data: [{
				type: "pie",
				indexLabelPlacement: "inside",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: result
			}]
		})
	}

	useEffect(()=>{
		userTimeInit();
	}, [props.today]);

	useEffect(()=>{
		allTimeInit()
	}, [props.allTime]);

		// const myData = [{angle: 1, label:"test"}, {angle: 5}, {angle: 2}]
    return (
        <div className="diagram">
            <CanvasJSChart options = {options1}/>
            <CanvasJSChart options = {options2}/>
			{/*<RadialChart*/}
			{/*	data={myData}*/}
			{/*	width={300}*/}
			{/*	height={300} />*/}
        </div>
    );
};

export default Diagrams;