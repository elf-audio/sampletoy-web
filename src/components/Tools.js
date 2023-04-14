import React, { useState } from 'react'
import close from '../close.svg'


const Tool = ({children}) => {
	return children;
}
const ToolItem = ({ name, isActive, onClick }) => {
	return <li className={isActive?"active":null} onClick={onClick}>
	{name}
	</li>;
}
const CloseButton = ({clicked}) => {
	return <div className="close" onClick={clicked}><img src={close} alt="close" /></div>
}
const Tools = ({ children }) => {
	const [activeTab, setActiveTab] = useState(-1);
	
	function closeTab() {
		setActiveTab(-1);
	}
	return <>
	<ul id="toolMenu">
	{children.map((child, index) =>
		<ToolItem name={child.props.name}
		key={child.props.name}
		isActive={activeTab === index}
		onClick={() => setActiveTab(index)}
		/>
		)}
		</ul>
		{children.map((child, index) => (
			<div className={"tool" + (activeTab === index?"":" invisible")}
			key={child.props.name}>
			<CloseButton clicked={closeTab}/>
			{child}
			</div>
			))}
			
			</>
		}
		
		export { Tools, Tool }
		