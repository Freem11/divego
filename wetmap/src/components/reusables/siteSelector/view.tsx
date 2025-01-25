import React from 'react';
import styles from './style.module.scss';
import Icon from '../../../icons/Icon';
import { DiveSiteWithUserName } from '../../../entities/diveSite';

type SiteSelectorViewProps = {
  sites:            DiveSiteWithUserName[] | null
  handleSitesAdd:   () => void
  handleSiteRemove: (id: number) => void
};

export default function SiteSelectorView({ sites, handleSitesAdd, handleSiteRemove }: SiteSelectorViewProps) {
  return (
    <>
      <div className={styles.siteSelector}>
        {sites === null
          ? (
              <div className={styles.loadingState}>
                <div className={styles.loader}></div>
              </div>
            )
          : (
              sites.length === 0
                ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyStateIcons}>
                        <Icon name="anchor" className={styles.emptyStateIconLeft} />
                        <Icon name="anchor" className={styles.emptyStateIcon} />
                        <Icon name="anchor" className={styles.emptyStateIconRight} />
                      </div>
                      <p>No dive sites yet.</p>
                    </div>
                  )
                : (
                    <div className={styles.siteList}>

                      {sites.map(site => (
                        <div key={site.id} className={styles.site}>
                          <div className={styles.siteLeft}>
                            <Icon name="anchor" />
                            <span>{site.name}</span>
                          </div>
                          <div className={styles.siteRight}>
                            <div className={styles.siteActions}>
                              <Icon name="close" onClick={() => handleSiteRemove(site.id)} />
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  )
            )}
        <button className={styles.button} type="button" onClick={handleSitesAdd}>
          <Icon name="add" />
          <span>Add dive sites</span>
        </button>
      </div>
    </>
  );
}
