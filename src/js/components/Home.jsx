import { useState, useEffect } from "react";

const getRandomColor = () => {
	const hexValues = "0123456789ABCDEF";
	let newColor = "#";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * hexValues.length);
		newColor += hexValues[randomIndex];
	}
	return newColor;
};

const ColorCard = ({ color }) => {

	useEffect(() => {
		// onLoad();
		console.log(`ColorCard mounted with color: ${color}`);

		// unMount();
		return () => {
			console.log(`ColorCard with color: ${color} is unmounting`);
		};

	}, []); // updates

	return <div className="card m-3 rounded-0" style={{ width: "18rem", backgroundColor: color }}>
		<div className="card-body">
			<h5 className="card-title text-white">{color}</h5>
		</div>
	</div>
};

const Home = () => {

	const [currentColor, setCurrentColor] = useState(getRandomColor());
	const [colorList, setColorList] = useState(["#32a852"])
	
	const [ newTypedColor, setNewTypedColor ] = useState("")

	const [ currentDate, setCurrentDate ] = useState(new Date().toLocaleString())

	useEffect(() => { // unica vez por que es como un onload
		setInterval(() => {
			setCurrentDate(new Date().toLocaleString())
		},1000)
	},[])

	return (
		<div className="text-center container d-flex flex-column mt-5 p-4" style={{ backgroundColor: currentColor }}>
			<div className="mt-4">
				<h1 className="display-4 text-primary">
					Welcome to our color palette generator!
				</h1>
				<p className="lead text-secondary">
					Generate beautiful color palettes with ease and inspiration.
				</p>

				<input 
					type="color" 
					value={newTypedColor || ""} 
					onChange={(e) => setNewTypedColor(e.target.value)} 
					className="form-control form-control-color mx-auto" 
					style={{ width: "6rem", height: "3rem" }}
				/>
				<button className="btn btn-warning" onClick={() => {

					const isValidHex = (text) => /^#([0-9A-F]{3}){1,2}$/i.test(text); // regex o expresion regular

					if(newTypedColor && !isValidHex(newTypedColor)) {
						alert("Please enter a valid hex color code.");
						return;
					}

					if(isValidHex(newTypedColor) && colorList.includes(newTypedColor)) {
						alert("This color is already in the list.");
						return;
					}

					if (newTypedColor != "") {
						console.log("Adding user-typed color:", newTypedColor);
						const colorToAdd = newTypedColor;
						setColorList([...colorList, colorToAdd]);
						setNewTypedColor("");
					} else {
						const randomColor = getRandomColor();
						console.log("Adding random color:", randomColor);
						setColorList( [...colorList, randomColor] ); // Spread operator
					}

				}}>
					Add new Color!
				</button>

			</div>
			<div className="container d-flex flex-column justify-content-center align-items-center mt-5">
				<p className="text-white">{currentDate}</p>
				{
					colorList.map((color, index) => {
						return <div key={index} 
							onClick={
								() => setColorList(colorList.filter(item => item != color))
							}
						>
							<ColorCard color={color} />
						</div>
					})
				}
			</div>
		</div>
	);
};

export default Home;