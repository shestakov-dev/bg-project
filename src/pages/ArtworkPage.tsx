import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { artworksWithZ } from "../data/artworks";

const Container = styled.div`
	min-height: 100vh;
	padding: 2rem;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	color: white;
`;

const BackButton = styled(motion.button)`
	background: rgba(255, 255, 255, 0.1);
	border: none;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	cursor: pointer;
	margin-bottom: 2rem;

	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`;

const Content = styled(motion.div)`
	max-width: 800px;
	margin: 0 auto;
`;

const Title = styled(motion.h1)`
	font-size: 2.5rem;
	margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
	line-height: 1.6;
	margin-bottom: 2rem;
`;

const ImageContainer = styled(motion.div)`
	margin: 2rem 0;
	width: 100%;
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;

	img {
		width: 100%;
		height: auto;
		max-width: 100%;
		border-radius: 8px;
		object-fit: contain;
	}
`;

const Metadata = styled(motion.div)`
	background: rgba(255, 255, 255, 0.1);
	padding: 1rem;
	border-radius: 8px;
	margin-top: 2rem;

	ul {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0;
	}

	li {
		margin: 0.5rem 0;
	}
`;

const ExtraInfoLink = styled.a`
	color: #61dafb;
	text-decoration: none;
	display: block;
	padding: 0.5rem;
	background: rgba(97, 218, 251, 0.1);
	border-radius: 4px;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(97, 218, 251, 0.2);
		transform: translateX(5px);
	}
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

export default function ArtworkPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const artwork = artworksWithZ.find(artwork => artwork.id === id);

	if (!artwork) {
		return (
			<Container>
				<CursorHint>
					Ако курсорът не се вижда, натиснете <b>Esc</b>
				</CursorHint>
				<BackButton
					onClick={() => navigate("/")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					← Назад към космоса
				</BackButton>
				<Content>
					<Title>Произведението не е намерено</Title>
				</Content>
			</Container>
		);
	}

	return (
		<Container>
			<CursorHint>
				Ако курсорът не се вижда, натиснете <b>Esc</b>
			</CursorHint>
			<BackButton
				onClick={() => navigate("/")}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}>
				← Назад към космоса
			</BackButton>

			<Content
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<Title>{artwork.title}</Title>

				<ImageContainer
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}>
					<img
						src={artwork.imageUrl}
						alt={artwork.title}
					/>
				</ImageContainer>

				<Description>{artwork.description}</Description>

				<Metadata
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}>
					<h3>Позиция в пространството:</h3>
					<p>
						X: {artwork.coordinates.x} (Отношение към чуждото)
						<br />
						Y: {artwork.coordinates.y} (Отношение към родното)
						<br />
						Z: {Math.round(artwork.coordinates.z)} (Исторически период)
					</p>

					{artwork.year && (
						<p>
							<strong>Година:</strong> {artwork.year}
						</p>
					)}

					{artwork.author && (
						<p>
							<strong>Автор:</strong> {artwork.author}
						</p>
					)}

					<p>
						<strong>Категория:</strong> {artwork.category}
					</p>

					{artwork.extraInformation && (
						<>
							<p>
								<strong>Допълнителна информация и източници:</strong>
							</p>
							<ul>
								{artwork.extraInformation.map(info => (
									<li key={info}>
										<ExtraInfoLink
											href={info}
											target="_blank"
											rel="noopener noreferrer">
											{info}
										</ExtraInfoLink>
									</li>
								))}
							</ul>
						</>
					)}
				</Metadata>
			</Content>
		</Container>
	);
}
