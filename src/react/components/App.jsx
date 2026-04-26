import { useState } from 'react';

const App = () => {
	const [count, setCount] = useState(0);
	function test() {
		setCount((prev) => prev + 1);
	}
	return (
		<>
			<button onClick={() => test()}>Click me {count}</button>
			<h1>hello world</h1>
		</>
	);
};

export default App;
