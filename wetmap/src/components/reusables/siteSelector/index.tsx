import React, { useState } from 'react';
import styles from './style.module.scss';
import Icon from '../../../icons/Icon';

export default function SiteSelector() {
  const testDiveSites = [
    [1, 'Whytecliff Park'],
    [2, 'Lookout Point'],
    [3, 'Copper Cove Road'],
    [4, 'Ansell Place'],
    [5, 'Bowyer Island'],
    [6, 'Kelvin Grove'],
    [7, 'Pam Rocks'],
    [8, 'Seymour Bay'],
    [9, 'HMCS Annapolis Wreck'],
    [10, 'Coopers Green'],
  ];

  const [sites, setSites] = useState<any[][]>(testDiveSites);

  function handleSitesAdd() {
    // Set map config to 3
    // Modal pause
  }

  // update marker so that is checks the map config and add site sets sites array context if it's not already in the array (or remove if already in array)
  // button brings modal back, sites array is kept in context until trip is created

  function unselect(siteId: number) {
    setSites(prevSites => prevSites.filter(site => site[0] !== siteId));
  }

  return (
    <>
      <div className={styles.siteSelector}>
        {sites.length === 0
          ? (
              <p>No sites yet.</p>
            )
          : (
              <div className={styles.siteList}>

                {sites.map(site => (
                  <div key={site[0]} className={styles.site}>
                    <div className={styles.siteLeft}>
                      <Icon name="anchor" />
                      <span>{site[1]}</span>
                    </div>
                    <div className={styles.siteRight}>
                      <span className={styles.siteCoordinates}>41.40338, 2.17403</span>
                      <div className={styles.siteActions}>
                        <Icon name="close" onClick={() => unselect(site[0])} />
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
        <button className={styles.site} type="button" onClick={handleSitesAdd}>
          <div className={styles.siteLeft}>
            <Icon name="add" />
            <span>Add dive sites</span>
          </div>
        </button>
      </div>
    </>
  );
}
