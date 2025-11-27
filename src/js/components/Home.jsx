import React, { useState } from "react";

const getRandomColor = () => {
	const hexValues = "0123456789ABCDEF";
	let newColor = "#";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * hexValues.length);
		newColor += hexValues[randomIndex];
	}
	return newColor;
};

const ColorCard = ({ color }) => (
	<div className="card m-3 rounded-0" style={{ width: "18rem", backgroundColor: color }}>
		<div className="card-body">
			<h5 className="card-title text-white">{color}</h5>
		</div>
	</div>
);

const Home = () => {

	const [currentColor, setCurrentColor] = useState(getRandomColor());
	
	const [colorList, setColorList] = useState(["#6932a8"]);

	return (
		<div className="text-center container mt-5 p-4" style={{ backgroundColor: currentColor }}>
			<div className="mt-4">
				<h1 className="display-4 text-primary">
					Welcome to our color palette generator!
				</h1>
				<p className="lead text-secondary">
					Generate beautiful color palettes with ease and inspiration.
				</p>

				<button className="btn btn-lg btn-success mt-3"
					onClick={() => setColorList([ getRandomColor(), ...colorList ])}
				>
					Generate color!
				</button>
			</div>
			<div className="container d-flex flex-wrap justify-content-center mt-5">
				{
					colorList.map((color, index) => (
						<ColorCard key={index} color={color} />
					))
				}
			</div>
		</div>
	);
};

export default Home;