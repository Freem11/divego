import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../googleMap/mapContext';
import { ModalContext } from '../modal/context';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';
import {  getDiveSitesByIDs } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import SiteSelectorView from './view';

export default function SiteSelector() {
  const { setMapConfig } = useContext(MapContext);
  const { modalPause } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext); // Site id's
  const [sites, setSites] = useState<DiveSiteWithUserName[] | null>(null); // Site info

  useEffect(() => {
    async function fetchSites() {
      try {
        const fetchedSites = await getDiveSitesByIDs(sitesArray);
        setSites(fetchedSites);
      } catch (e) {
        console.log({ title: 'Error', message: (e as Error).message });
      }
    };

    // Logic to minimize db fetches
    if (sites === null && sitesArray.length !== 0) { // If there is no site info and there are site id's
      fetchSites(); // Get the site info
    } else if (sites !== null) { // If there is site info
      if (sitesArray.length > sites.length) { // If there are more id's than corresponding info
        fetchSites(); // Get the new site info
      } else { // If there is more info than corresponding id's
        setSites(sites.filter(site => sitesArray.includes(site.id))); // Remove the info with no matching id
      }
    } else { // If there are no id's
      setSites([]); // Set site info to empty array
    }
  }, [sitesArray]);

  function handleSitesAdd() {
    setMapConfig(3);
    modalPause();
  }

  function handleSiteRemove(siteId: number) {
    setSitesArray(prev => prev.filter(id => id !== siteId));
  }

  return (
    <SiteSelectorView sites={sites} handleSitesAdd={handleSitesAdd} handleSiteRemove={handleSiteRemove} />
  );
}
