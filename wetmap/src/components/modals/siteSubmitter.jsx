import { useState, useEffect, useContext, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import { animated, useSpring } from 'react-spring';
import ConfirmationModal from './confirmationModal';
import './confirmationModal.css';
import './siteSubmitter.css';
import exifr from 'exifr';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { exifGPSHelper } from '../../helpers/exifGPSHelpers';
import Collapse from '@mui/material/Collapse';
import { insertDiveSiteWaits } from '../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { userCheck } from '../../supabaseCalls/authenticateSupabaseCalls';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { MasterContext } from '../contexts/masterContext';
import { ModalSelectContext } from '../contexts/modalSelectContext';
import { Iterrator2Context } from '../contexts/iterrator2Context';
import { TutorialContext } from '../contexts/tutorialContext';
import { ChapterContext } from '../contexts/chapterContext';
import InputField from '../reusables/inputField';
import CustomButton from '../reusables/button/button';
import CloseButton from '../closeButton/closeButton';
import SubmitButton from '../reusables/button/submitButton';


const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

const noGPSZone = (
	<div
		style={{
			marginLeft: '2%',
			backgroundColor: 'pink',
			height: '40px',
			width: '95%',
			color: 'red',
			borderRadius: '15px',
		}}
	>
		<h4 style={{ marginLeft: '35px', paddingTop: '10px' }}>
			No GPS Coordinates Found!
		</h4>
	</div>
);

const SiteSubmitter = (props) => {
	const { animateSiteModal, setSiteModalYCoord } = props;
	const [showNoGPS, setShowNoGPS] = useState(false);
	const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
	const { setMasterSwitch } = useContext(MasterContext);
	const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
	const { itterator2, setItterator2 } = useContext(Iterrator2Context);
	const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);
	const { chapter, setChapter } = useContext(ChapterContext);

	const [uploadedFile, setUploadedFile] = useState({
		selectedFile: null,
	});

	const successModalRef = useRef(null);
	const cautionModalRef = useRef(null);
	const [successModalYCoord, setSuccessModalYCoord] = useState(0);
	const [cautionModalYCoord, setCautionModalYCoord] = useState(0);

	const sucessModalSlide = useSpring({
		from: { transform: `translate3d(0,0,0)` },
		to: { transform: `translate3d(0,${successModalYCoord}px,0)` },
	});

	const cautionModalSlide = useSpring({
		from: { transform: `translate3d(0,0,0)` },
		to: { transform: `translate3d(0,${cautionModalYCoord}px,0)` },
	});

	const animateSuccessModal = () => {
		if (successModalYCoord === 0) {
			setSuccessModalYCoord(-windowHeight);
		} else {
			setSuccessModalYCoord(0);
		}
	};

	const animateCautionModal = () => {
		if (cautionModalYCoord === 0) {
			setCautionModalYCoord(-windowHeight);
		} else {
			setCautionModalYCoord(0);
		}
	};

	window.addEventListener('resize', trackDimensions);

	const [windowWidth, setWindowWidth] = useState(screenWidthInital);
	const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

	function trackDimensions() {
		setWindowWidth(window.innerWidth);
		setWindowHeigth(window.innerHeight);
	}

	const handleChange = (e) => {
		setAddSiteVals({ ...addSiteVals, [e.target.name]: e.target.value });

		if (e.target.name === 'PicFile') {
			setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

			exifr.parse(e.target.files[0]).then((output) => {
				let EXIFData = exifGPSHelper(
					output.GPSLatitude,
					output.GPSLongitude,
					output.GPSLatitudeRef,
					output.GPSLongitudeRef
				);

				if (EXIFData) {
					setAddSiteVals({
						...addSiteVals,
						Latitude: EXIFData[0],
						Longitude: EXIFData[1],
					});
				} else {
					setAddSiteVals({ ...addSiteVals });
					setShowNoGPS(true);
				}
			});
		}
	};

	const handleDiveSiteGPS = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					setAddSiteVals({
						...addSiteVals,
						Latitude: position.coords.latitude,
						Longitude: position.coords.longitude,
					});
				},
				function (error) {
					console.log('location permissions denied', error.message);
				},
				{ enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
			);
			if (tutorialRunning) {
				if (itterator2 === 13) {
					setItterator2(itterator2 + 1);
					setLocButState(false);
				}
			}
		} else {
			console.log('unsupported');
		}
	};

	const handleNoGPSClose = () => {
		setShowNoGPS(false);
		return;
	};

	const handleNoGPSCloseOnMapChange = () => {
		if (itterator2 === 13 || itterator2 === 23) {
			return;
		}

		setChosenModal('DiveSite');
		setShowNoGPS(false);
		setMasterSwitch(false);
		animateSiteModal();

		if (tutorialRunning) {
			if (itterator2 === 16) {
				setItterator2(itterator2 + 1);
				setPinButState(false);
			}
		}
	};

	let counter1 = 0;
	let counter2 = 0;
	let blinker1;
	let blinker2;
	let timer2;

	const [locButState, setLocButState] = useState(false);
	const [pinButState, setPinButState] = useState(false);
	const [siteNameState, setSiteNameState] = useState(false);
	const [subButState, setSubButState] = useState(false);

	function locationBut() {
		counter1++;
		if (counter1 % 2 == 0) {
			setLocButState(false);
		} else {
			setLocButState(true);
		}
	}

	function pinBut() {
		counter1++;
		if (counter1 % 2 == 0) {
			setPinButState(false);
		} else {
			setPinButState(true);
		}
	}

	function siteField() {
		counter1++;
		if (counter1 % 2 == 0) {
			setSiteNameState(false);
		} else {
			setSiteNameState(true);
		}
	}

	function subButTimeout() {
		blinker2 = setInterval(subBut, 1000);
	}

	function subBut() {
		counter2++;
		if (counter2 % 2 == 0) {
			setSubButState(false);
		} else {
			setSubButState(true);
		}
	}

	function cleanUp() {
		clearInterval(blinker1);
		clearInterval(blinker2);
		setLocButState(false);
		setPinButState(false);
		setSiteNameState(false);
		setSubButState(false);
	}

	let modalHeigth = 700;

	useEffect(() => {
		if (tutorialRunning) {
			if (itterator2 === 16) {
				blinker1 = setInterval(pinBut, 600);
			} else if (itterator2 === 13) {
				blinker1 = setInterval(locationBut, 1000);
			} else if (itterator2 === 15 || itterator2 == 10) {
				setSiteModalYCoord(-windowHeight + (windowHeight - modalHeigth) / 2);
			} else if (itterator2 === 8 || itterator2 === 1) {
				setSiteModalYCoord(0);
			} else if (itterator2 === 23) {
				blinker1 = setInterval(siteField, 1000);
				timer2 = setTimeout(subButTimeout, 300);
			} else if (itterator2 === 26) {
				setAddSiteVals({
					...addSiteVals,
					Site: '',
					Latitude: '',
					Longitude: '',
				});
				animateSiteModal();
			}
		}
		return () => cleanUp();
	}, [itterator2]);

	const buttonColor = {
		color: 'gold',
		width: '3.5vw',
		height: '3.5vh',
		cursor: 'pointer',
	};

	const buttonColorAlt = {
		color: '#538bdb',
		width: '3.5vw',
		height: '3.5vh',
		cursor: 'pointer',
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let SiteV = addSiteVals.Site.toString();
		let LatV = parseFloat(addSiteVals.Latitude);
		let LngV = parseFloat(addSiteVals.Longitude);

		if (tutorialRunning) {
			if (itterator2 === 23) {
				setItterator2(itterator2 + 1);
			}
		} else if (
			SiteV &&
			typeof SiteV === 'string' &&
			LatV &&
			typeof LatV === 'number' &&
			LngV &&
			typeof LngV === 'number'
		) {
			insertDiveSiteWaits(addSiteVals);
			setAddSiteVals({ ...addSiteVals, Site: '', Latitude: '', Longitude: '' });
			animateSuccessModal();
			return;
		} else {
			animateCautionModal();
		}
	};

	function handleClick() {
		document.getElementById('file').click();
	}

	const handleModalClose = () => {
		if (
			itterator2 === 13 ||
			itterator2 === 16 ||
			itterator2 === 19 ||
			itterator2 === 23
		) {
			return;
		}
		setAddSiteVals({ ...addSiteVals, Site: '', Latitude: '', Longitude: '' });
		animateSiteModal();
	};

	const activateGuide = () => {
		if (tutorialRunning) {
		} else {
			setChapter('DS Help');
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100%',
				// backgroundColor: "palegoldenrod"
			}}
		>
			<div className='modalTitle3'>
				<Label
					style={{
						width: '100vw',
						marginLeft: '1vw',
						textAlign: 'left',
						fontFamily: 'Patrick Hand',
						fontSize: '2vw',
						// backgroundColor: "pink",
					}}
				>
					<strong>Submit Your Dive Site</strong>
				</Label>
				<CustomButton
					onClick={() => activateGuide()}
					svg={
						<QuestionMarkIcon
							sx={{
								color: 'gold',
								width: '3.5vw',
								height: '3.5vh',
								padding: '1px',
								cursor: 'pointer',
							}}
						/>
					}
				/>
				<FormGroup>
					<CloseButton
						onClick={handleModalClose}
					/>
				</FormGroup>
			</div>

			<div className='lowerBoxSite'>
				<div className='inputbox'>
					<FormGroup>
						<InputField
							placeholder='Site Name'
							type='text'
							name='Site'
							value={addSiteVals.Site}
							onChange={handleChange}
							onClick={handleNoGPSClose}
							highlighted={siteNameState}
						/>
					</FormGroup>
				</div>

				<div className='inputbox'>
					<FormGroup>
						<InputField
							placeholder='Latitude'
							type='decimal'
							name='Latitude'
							value={addSiteVals.Latitude}
							onChange={handleChange}
							onClick={handleNoGPSClose}
						/>
					</FormGroup>
				</div>

				<div className='inputbox'>
					<FormGroup>
						<InputField
							placeholder='Longitude'
							type='decimal'
							name='Longitude'
							value={addSiteVals.Longitude}
							onChange={handleChange}
							onClick={handleNoGPSClose}
						/>
					</FormGroup>
				</div>
			</div>

			<div className='buttonBoxLocation'>
				<CustomButton
					onClick={handleDiveSiteGPS}
					svg={
						<MyLocationIcon sx={locButState ? buttonColorAlt : buttonColor} />
					}
					btnState={locButState}
				/>
				<CustomButton
					onClick={handleNoGPSCloseOnMapChange}
					svg={<PlaceIcon sx={pinButState ? buttonColorAlt : buttonColor} />}
					btnState={pinButState}
				/>
			</div>

			<FormGroup>
				<SubmitButton
					active={ !!subButState}
					onClick={handleSubmit}
				>
					Submit Dive Site
				</SubmitButton>
			</FormGroup>

			<animated.div
				className='successModal modalBase'
				style={sucessModalSlide}
				ref={successModalRef}
			>
				<ConfirmationModal
					submissionItem='dive site'
					animateModal={animateSuccessModal}
					handleClose={handleModalClose}
					isSuccess={true}
				/>
			</animated.div>

			<animated.div
				className='cautionModal modalBase'
				style={cautionModalSlide}
				ref={cautionModalRef}
			>
				<ConfirmationModal
					submissionItem='dive site'
					animateModal={animateCautionModal}
					isSuccess={false}
				/>
			</animated.div>
		</div>
	);
};

export default SiteSubmitter;
