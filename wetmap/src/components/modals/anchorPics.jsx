import { FormGroup, Button } from 'reactstrap';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { AnimalContext } from '../contexts/animalContext';
import { AnchorModalContext } from '../contexts/anchorModalContext';
import { PicAdderModalContext } from '../contexts/picAdderModalContext';
import { IterratorContext } from '../contexts/iterratorContext';
import { TutorialContext } from '../contexts/tutorialContext';
import { UserProfileContext } from '../contexts/userProfileContext';
import { PinContext } from '../contexts/staticPinContext';
import { useState, useContext, useEffect } from 'react';
import { siteGPSBoundaries } from '../../helpers/mapHelpers';
import {
	getDiveSiteByName,
	getDiveSiteWithUserName,
} from '../../supabaseCalls/diveSiteSupabaseCalls';
import {
	// getPhotosforAnchorMulti,
	getPhotosWithUser,
	getPhotosWithUserEmpty,
} from '../../supabaseCalls/photoSupabaseCalls';
import Picture from './picture';
import FlagIcon from '@mui/icons-material/Flag';
import CloseButton from "../closeButton/closeButton";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './anchorPics.css';
import CustomButton from '../reusables/button/button';

const AnchorPics = (props) => {
	const {
		animateAnchorModal,
		setAnchorModalYCoord,
		animateFullScreenModal,
		setPicModalYCoord,
	} = props;
	const { profile } = useContext(UserProfileContext);
	const { siteModal, setSiteModal } = useContext(AnchorModalContext);
	const { setPicAddermodal } = useContext(PicAdderModalContext);
	const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
	const { animalVal } = useContext(AnimalContext);
	const { pin, setPin } = useContext(PinContext);

	const [anchorPics, setAnchorPics] = useState([]);
	const [site, setSite] = useState('');

	const { itterator, setItterator } = useContext(IterratorContext);
	const { tutorialRunning } = useContext(TutorialContext);

	const filterAnchorPhotos = async () => {
		let { minLat, maxLat, minLng, maxLng } = siteGPSBoundaries(
			selectedDiveSite.Latitude,
			selectedDiveSite.Longitude
		);

		try {
			let photos;
			if (animalVal.length === 0) {
				photos = await getPhotosWithUserEmpty({
					myCreatures: '',
					userId: profile[0].UserID,
					minLat,
					maxLat,
					minLng,
					maxLng,
				});
			} else {
				photos = await getPhotosWithUser({
					animalMultiSelection: animalVal,
					myCreatures: '',
					userId: profile[0].UserID,
					minLat,
					maxLat,
					minLng,
					maxLng,
				});
			}
			if (photos) {
				setAnchorPics(photos);

				if (tutorialRunning && itterator === 11 && siteModal) {
					if (photos.length === 0) {
						setItterator(itterator + 1);
					} else {
						setItterator(itterator + 3);
					}
				}
			}
		} catch (e) {
			console.log({ title: 'Error', message: e.message });
		}
	};

	useEffect(() => {
		if (selectedDiveSite.SiteName !== '') {
			filterAnchorPhotos();
		}
	}, []);

	useEffect(() => {
		if (selectedDiveSite.SiteName !== '') {
			filterAnchorPhotos();
		}
	}, [siteModal]);

	useEffect(() => {
		if (selectedDiveSite.SiteName !== '') {
			filterAnchorPhotos();
			getDiveSite(selectedDiveSite.SiteName);
		}
	}, [selectedDiveSite]);

	useEffect(() => {
		if (itterator === 25) {
			animateAnchorModal();
		}
	}, [itterator]);

	const getDiveSite = async () => {
		try {
			const selectedSite = await getDiveSiteWithUserName({
				siteName: selectedDiveSite.SiteName,
				lat: selectedDiveSite.Latitude,
				lng: selectedDiveSite.Longitude,
			});
			if (selectedSite.length > 0) {
				setSite(selectedSite[0].newusername);
			}
		} catch (e) {
			console.log({ title: 'Error', message: e.message });
		}
	};

	const handleClose = async () => {
		if (tutorialRunning && itterator === 16) {
			setItterator(itterator + 1);
		}
		setSiteModal(false);
		animateAnchorModal();
	};

	const handleSwitch = () => {
		if (itterator === 11 || itterator == 15) {
			return;
		}
		setPin({
			...pin,
			Latitude: selectedDiveSite.Latitude,
			Longitude: selectedDiveSite.Longitude,
		});
		setSiteModal(false);
		setPicAddermodal(true);
	};

	return (
		<div className='masterDivA'>
			<div className='fixerDiv'>
				<div className='fixDiv'>
					<div className='topDiv'>
						<div className='flagContainer'>
							<a
								className='atagDS'
								href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${selectedDiveSite.SiteName}"%20at%20Latitude:%20${selectedDiveSite.Latitude}%20Longitude:%20${selectedDiveSite.Longitude}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`}
							>
								<FlagIcon sx={{ color: 'red', height: '5vh', width: '4vw' }} />
							</a>
						</div>
						<div className='dsInfo'>
							<h3 className='DiveSiteLabel'>{selectedDiveSite.SiteName}</h3>
							<h3 className='DiveSiteCredit'>Added by: {site}</h3>
						</div>
						<CustomButton
							onClick={() => handleSwitch()}
							svg={
								<AddPhotoAlternateIcon
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
							<CloseButton onClick={handleClose} />
						</FormGroup>
					</div>
				</div>
			</div>
			<div className='picScollA'>
				{anchorPics &&
					anchorPics.map((pic) => {
						return (
							<Picture
								key={pic.id}
								pic={pic}
								animateFullScreenModal={animateFullScreenModal}
							></Picture>
						);
					})}
				{anchorPics.length === 0 && (
					<div className='emptysite'>No Sightings At This Site Yet!</div>
				)}
			</div>
		</div>
	);
};

export default AnchorPics;
