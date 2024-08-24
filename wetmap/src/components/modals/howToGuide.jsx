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

	const handleTutorialStartup = () => {
		setItterator(0);
		setTutorialRunning(true);
		animateIntroGuideModal();
		animateLaunchModal();
		setGuideModal(!guideModal);
	};

	const handleSecondTutorialStartup = () => {
		setItterator2(0);
		setTutorialRunning(true);
		animateSecondGuideModal();
		animateLaunchModal();
		setSecondGuideModal(!secondGuideModal);
	};

	const handleThirdTutorialStartup = () => {
		setItterator2(0);
		setTutorialRunning(true);
		animateThirdGuideModal();
		animateLaunchModal();
		setThirdGuideModal(!thirdGuideModal);
	};

	return (
		<>
			<ModalHeader
				title={'How to use Scuba SEAsons'}
				onClose={animateLaunchModal}
			/>

			{/* <div className='flex-center-column' style={{ marginTop: '-25%' }}> */}
			<div className='flex-center-column'>
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
