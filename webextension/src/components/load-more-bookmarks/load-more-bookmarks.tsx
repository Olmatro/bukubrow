import React, { SFC } from 'react';
import styles from './load-more-bookmarks.css';

interface Props {
	numRemainingBookmarks: number;
	renderAllBookmarks(renderAll: boolean): void;
}

const LoadMoreBookmarks: SFC<Props> = ({ numRemainingBookmarks, renderAllBookmarks }) => (
	<p
		className={styles.msg}
		onClick={() => { renderAllBookmarks(true); }} // tslint:disable-line jsx-no-lambda
	>
		...and {numRemainingBookmarks} more.
	</p>
);

export default LoadMoreBookmarks;
