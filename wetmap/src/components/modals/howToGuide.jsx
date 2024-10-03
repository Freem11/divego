import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import { IterratorContext } from '../contexts/iterratorContext';
import { Iterrator2Context } from '../contexts/iterrator2Context';
import { Iterrator3Context } from '../contexts/iterrator3Context';
import { TutorialModelContext } from '../contexts/tutorialModalContext';
import { SecondTutorialModalContext } from '../contexts/secondTutorialModalContext';
import { ThirdTutorialModalContext } from '../contexts/thirdTutorialModalContext';
import ModalHeader from '../reusables/modalHeader';
import LargeButton from '../reusables/button/largeButton';
import IntroTutorial from '../guides/introTutorial';
import { ModalContext } from '../contexts/modalContext';

const HowToGuide = (props) => {
	const { itterator, setItterator } = useContext(IterratorContext);
	const { itterator2, setItterator2 } = useContext(Iterrator2Context);
	const { itterator3, setItterator3 } = useContext(Iterrator3Context);
	const {
		animateLaunchModal,
		animateIntroGuideModal,
		animateSecondGuideModal,
		animateThirdGuideModal,
	} = props;
	const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
	const { guideModal, setGuideModal } = useContext(TutorialModelContext);
	const { secondGuideModal, setSecondGuideModal } = useContext(
		SecondTutorialModalContext
	);
	const { thirdGuideModal, setThirdGuideModal } = useContext(
		ThirdTutorialModalContext
	);
	const { modalSuccess } = useContext(ModalContext);


	const handleTutorialStartup = () => {
		modalSuccess()
		setItterator(0);
		setTutorialRunning(true);
		animateIntroGuideModal();
		setGuideModal(!guideModal);
	};

	const handleSecondTutorialStartup = () => {
		modalSuccess()
		setItterator2(0);
		setTutorialRunning(true);
		animateSecondGuideModal();
		setSecondGuideModal(!secondGuideModal);
	};

	const handleThirdTutorialStartup = () => {
		modalSuccess()
		setItterator2(0);
		setTutorialRunning(true);
		animateThirdGuideModal();
		setThirdGuideModal(!thirdGuideModal);
	};

	const { modalCancel } = useContext(ModalContext);

	return (
		<>
			<ModalHeader
				title={'How to use Scuba SEAsons'}
				onClose={modalCancel}
			/>

			{/* <div className='flex-center-column' style={{ marginTop: '-25%' }}> */}
			<div className='hero flex-centered'>
				<LargeButton onClick={handleTutorialStartup} btnText={'Intro Guide'} />
				<LargeButton
					onClick={handleSecondTutorialStartup}
					btnText={'Fun With Dive Sites'}
				/>
				<LargeButton
					onClick={handleThirdTutorialStartup}
					btnText={'Photogenics'}
				/>
			</div>
		</>
	);
};

export default HowToGuide;
