import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	min-height: 100vh;
	padding: 2rem;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	color: white;
	position: relative;
`;

const CursorHint = styled.div`
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	background: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	font-size: 0.9rem;
	z-index: 1000;
`;

const BackButton = styled(motion.button)`
	position: fixed;
	top: 20px;
	left: 20px;
	padding: 10px 20px;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 5px;
	color: white;
	font-family: Arial, sans-serif;
	font-size: 16px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`;

const Title = styled(motion.h1)`
	font-size: 2.5rem;
	margin-bottom: 2rem;
	margin-top: 3rem;
	text-align: center;
`;

const Content = styled(motion.div)`
	max-width: 800px;
	margin: 0 auto;
	line-height: 1.6;
`;

const Section = styled(motion.section)`
	margin-bottom: 2rem;
`;

export default function AboutPage() {
	const navigate = useNavigate();

	return (
		<Container>
			<CursorHint>
				Ако курсорът не се вижда, натиснете <b>Esc</b>
			</CursorHint>
			<BackButton
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				onClick={() => navigate("/")}>
				← Назад
			</BackButton>
			<Title
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				Родното и чуждото
			</Title>
			<Content
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}>
				<Section>
					<h2>Концепция</h2>
					<p>
						Този проект изследва темата "Родното и чуждото" чрез триизмерно
						пространство, където всяка точка представлява различни аспекти от нашата
						културна идентичност и нейното взаимодействие с чуждите влияния.
					</p>
				</Section>
				<Section>
					<h2>Измерения</h2>
					<p style={{ fontStyle: "italic", marginBottom: "1em", color: "#aaa" }}>
						Забележка: Координатите са субективни и някои от тях са коригирани за
						по-добро визуално представяне, без да се променя основната концепция на
						произведението. Координатната система е максимално разредена, за да
						позволява лесен достъп до всички произведения.
					</p>
					<ul>
						<li>
							<strong>X ос:</strong> Отношение към чуждото
							<br />← отрицателно | положително →
							<br />
							-50 = пълна враждебност | +50 = пълно приемане/любопитство
						</li>
						<li>
							<strong>Y ос:</strong> Отношение към родното
							<br />← отрицание / срам | принадлежност / гордост →
							<br />
							-50 = силен срам или отричане | +50 = силна гордост и идентификация
						</li>
						<li>
							<strong>Z ос:</strong> Исторически период (спрямо произведениета в
							проекта)
							<br />← минало изкуство | съвременно изкуство →
							<br />
							-50 = най-старо произведение в списъка | +50 = най-ново произведение в
							списъка
						</li>
					</ul>
				</Section>
				<Section>
					<h2>Как да разчитаме пространството</h2>
					<p>
						Всяка планета в космоса представлява конкретно произведение на изкуството.
						Позицията ѝ в пространството показва как произведението се отнася към
						родното и чуждото, както и в кой исторически период е създадено. Близките
						планети имат подобия в тези аспекти – например, произведения, които са
						близо по X координата, имат сходно отношение към чуждото, а тези, които са
						близо по Y координата, споделят подобно отношение към родното.
					</p>
				</Section>
			</Content>
		</Container>
	);
}
