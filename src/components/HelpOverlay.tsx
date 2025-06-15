import { useState } from "react";
import styled from "@emotion/styled";

const Overlay = styled.div<{ visible: boolean }>`
	position: fixed;
	top: 70px;
	left: 24px;
	z-index: 2000;
	background: rgba(20, 20, 40, 0.95);
	color: #fff;
	padding: 1.2rem 1.5rem 1.2rem 1.5rem;
	border-radius: 10px;
	box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);
	font-size: 1rem;
	max-width: 340px;
	transition: opacity 0.3s;
	opacity: ${props => (props.visible ? 1 : 0)};
	pointer-events: ${props => (props.visible ? "auto" : "none")};
	margin-top: 20px;
`;

const ToggleButton = styled.button`
	position: fixed;
	top: 24px;
	left: 24px;
	z-index: 2100;
	background: rgba(255, 255, 255, 0.15);
	color: #fff;
	border: none;
	border-radius: 50%;
	width: 36px;
	height: 36px;
	font-size: 1.2rem;
	cursor: pointer;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
	transition: background 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: rgba(255, 255, 255, 0.3);
	}
`;

export default function HelpOverlay() {
	const [visible, setVisible] = useState(true);

	return (
		<>
			<ToggleButton
				onClick={() => setVisible(v => !v)}
				title={visible ? "Скрий помощта" : "Покажи помощта"}>
				{visible ? "✕" : "?"}
			</ToggleButton>
			<Overlay visible={visible}>
				<strong>Как да използвате сайта:</strong>
				<ul
					style={{ margin: "0.7em 0 0 1.1em", fontSize: "0.98em", lineHeight: 1.5 }}>
					<li>
						<b>W A S D</b> – движение в триизмерното пространство
					</li>
					<li>
						<b>Мишка</b> – оглеждане (само в режим на движение)
					</li>
					<li>
						<b>Esc</b> – излизане от режим на движение (появява се курсор, с който
						могат да се избира планета или бутона "За проекта")
					</li>
					<li>
						<b>Ляв бутон на мишката</b> – връщане в режим на движение (скрива се
						курсора)
					</li>
					<li>
						<b>Q / E</b> – движение нагоре/надолу
					</li>
					<li>
						<b>Ляв бутон на мишката върху планета</b> – отваря детайли за
						произведението (само извън режим на движение)
					</li>
					<li>
						<b>За проекта</b> – информация за концепцията (само извън режим на
						движение)
					</li>
				</ul>
			</Overlay>
		</>
	);
}
