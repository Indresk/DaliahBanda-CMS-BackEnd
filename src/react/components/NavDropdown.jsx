import { useState } from 'react';

const NavDropdown = ({ data }) => {
	const [dropdown, setDropDown] = useState(false);
	return (
		<>
			<nav className={dropdown ? '' : 'hide'}>
				<ul className='flex fd-c px-4 py-2 g-1'>
					{data.map((item, index) => (
						<li key={index}>
							<a href={item.link}>{item.name}</a>
						</li>
					))}
				</ul>
				<form action='/auth/logout' method='post'>
					<button type='submit' className='secondary'>
						Logout
					</button>
				</form>
			</nav>
			<div className='icon' onClick={() => setDropDown((prev) => !prev)}>
				<svg
					className={dropdown ? 'active' : 'inactive'}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					stroke='currentColor'>
					<path d='M4 5h16' />
					<path d='M4 12h16' />
					<path d='M4 19h16' />
				</svg>
			</div>
		</>
	);
};

export default NavDropdown;
