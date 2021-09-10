import React from 'react';

const Loader = ({ message }) => {
	return (
		<div className="loader">
			<div className="loader-spin">{message}</div>
		</div>
	);
};

Loader.defaultProps = {
	message: 'Loading...'
};

export default Loader;
