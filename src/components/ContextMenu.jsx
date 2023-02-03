import React from 'react'

function ContextMenu({ coords }) {
	return (
		<div style={{ left: coords.left, top: coords.top }} className="context-menu"></div>
	)
}

export default ContextMenu;