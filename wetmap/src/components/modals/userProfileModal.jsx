import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
	grabProfileById,
	getProfileWithStats,
	updateProfile,
} from '../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../contexts/sessionContext';
import { UserProfileContext } from '../contexts/userProfileContext';
import { ProfileModalContext } from '../contexts/profileModalContext';
import { SelectedProfileContext } from '../contexts/selectedProfileModalContext';
import { AnchorModalContext } from '../contexts/anchorModalContext';
import {
	insertUserFollow,
	deleteUserFollow,
	checkIfUserFollows,
} from '../../supabaseCalls/userFollowSupabaseCalls';
import './userProfile.css';
import InputField from '../reusables/inputField';
import SubmitButton from '../reusables/button/submitButton';
import ModalHeader from '../reusables/modalHeader';

export default function UserProfileModal(props) {
	const { animateProfileModal } = props;
	const { activeSession } = useContext(SessionContext);
	const { profile, setProfile } = useContext(UserProfileContext);
	const [profileCloseState, setProfileCloseState] = useState(false);
	const [imaButState, setImaButState] = useState(false);
	const [followButState, setFollowButState] = useState(false);
	const [userFollows, setUserFollows] = useState(false);
	const [picUri, setPicUri] = useState(null);
	const { profileModal, setProfileModal } = useContext(ProfileModalContext);
	const [userStats, setUserStats] = useState('');
	const { selectedProfile, setSelectedProfile } = useContext(
		SelectedProfileContext
	);
	const { siteModal, setSiteModal } = useContext(AnchorModalContext);
	const [followData, setFollowData] = useState(activeSession.user.id);
	const [username, setUsername] = useState(null);
	const [formError, setFormError] = useState(null);
	const [saveButState, setSaveButState] = useState(false);

	const handleFollow = async (userName) => {
		// if (profile[0].UserID === picOwnerAccount[0].UserID){
		//   return
		// }

		if (userFollows) {
			deleteUserFollow(followData);
			setUserFollows(false);
		} else {
			if (userStats) {
				let newRecord = await insertUserFollow(
					profile[0].UserID,
					userStats[0].userid
				);
				setFollowData(newRecord[0].id);
				setUserFollows(true);
			}
		}
	};

	useEffect(() => {
		getProfile();

		async function followCheck() {
			let alreadyFollows = await checkIfUserFollows(
				activeSession.user.id,
				selectedProfile
			);
			if (alreadyFollows.length > 0) {
				setUserFollows(true);
				setFollowData(alreadyFollows[0].id);
			}
		}

		followCheck();
	}, []);

	useEffect(() => {
		getProfile();

		async function followCheck() {
			let alreadyFollows = await checkIfUserFollows(
				activeSession.user.id,
				selectedProfile
			);
			if (alreadyFollows.length > 0) {
				setUserFollows(true);
				setFollowData(alreadyFollows[0].id);
			}
		}

		followCheck();
	}, [profileModal, selectedProfile]);

	const getProfile = async () => {
		let userID;
		if (selectedProfile) {
			userID = selectedProfile;
		} else {
			userID = activeSession.user.id;
		}

		try {
			const success = await getProfileWithStats(userID);
			if (success) {
				setUserStats(success);
			}
		} catch (e) {
			console.log({ title: 'Error', message: e.message });
		}
	};

	const toggleProfileModal = () => {
		setProfileModal(false);

		if (selectedProfile) {
			setSiteModal(true);
			setSelectedProfile(null);
		}
	};

	const handleSubmit = async () => {
		if (!userStats || !userStats[0]) {
			return true;
		}
		if (username === null) {
			// user never touched the input
			return true;
		}
		if (username === userStats[0].username) {
			// no changes
			return true;
		}
		if (username === '') {
			setFormError('Your Username cannot be blank!');
			return false;
		}

		try {
			await updateProfile({
				id: activeSession.user.id,
				username: username,
			});
			return true;
		} catch (e) {
			if (e && e.code === '23505') {
				setFormError('This username belongs to another user');
				return false;
			}
			setFormError('Something went wrong. Please try later.');
			console.log({ title: 'Error', message: e.message });
			return false;
		}
	};

	return (
		<>
			<ModalHeader
				title={
					selectedProfile
						? userStats && userStats[0].username + "'s Diving"
						: 'My Diver Profile'
				}
				onClose={toggleProfileModal}
			/>

			<div className='hero hero-sm mx-4'>
				<div className='hero-body'>
					{selectedProfile ? (
						<div className='columns'>
							<strong
								onClick={() => handleFollow()}
								className={`column col-6 p-centered btn btn-lg extra-shadow ${
									userFollows ? '' : 'btn-primary'
								}`}
							>
								{userFollows
									? 'Following ' +
									  (userStats && userStats[0] && userStats[0].username)
									: 'Follow ' +
									  (userStats && userStats[0] && userStats[0].username)}
							</strong>
						</div>
					) : (
						<>
							<div className='columns mb-4'>
								<InputField
									className='column col-12'
									placeholder='Diver Name'
									name='userField'
									value={
										username !== null
											? username
											: userStats && userStats[0].username
									}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>

							<div className='columns'>
								<InputField
									className='column col-12'
									placeholder='Email'
									name='emailField'
									value={userStats[0] && userStats[0].email}
								/>
							</div>
						</>
					)}
				</div>

				<div className='hero-body'>
					<div className='columns mb-4'>
						<InputField
							className='column col-6'
							name='photoCountField'
							value={
								'Sea Life: ' +
								(userStats && userStats[0] && ' ' + userStats[0].photocount)
							}
							contentEditable={false}
						/>
						<InputField
							className='column col-6'
							name='diveSiteCountField'
							value={
								'Dive Sites: ' +
								(userStats && userStats[0] && ' ' + userStats[0].divesitecount)
							}
							contentEditable={false}
						/>
					</div>
					<div className='columns mb-4'>
						<InputField
							className='column col-6'
							name='followerCountField'
							value={
								'Followers: ' +
								(userStats && userStats[0] && ' ' + userStats[0].followercount)
							}
							contentEditable={false}
						/>
						<InputField
							className='column col-6'
							name='commentCountField'
							value={
								'Comments: ' +
								(userStats && userStats[0] && ' ' + userStats[0].commentcount)
							}
							contentEditable={false}
						/>
					</div>
					<div className='columns mb-2'>
						<div className='column col-3'></div>
						<InputField
							className='column col-6'
							name='likeCountField'
							value={
								'Likes: ' +
								(userStats && userStats[0] && ' ' + userStats[0].likecount)
							}
							contentEditable={false}
						/>
						<div className='column col-3'></div>
					</div>
				</div>
			</div>
			{!selectedProfile && (
				<SubmitButton
					onClick={async () => {
						(await handleSubmit()) && toggleProfileModal();
					}}
				>
					Save changes
				</SubmitButton>
			)}
		</>
	);
}
