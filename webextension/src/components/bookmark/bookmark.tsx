import React, { memo, forwardRef, Ref, MouseEvent } from 'react';
import cn from 'classnames';
import { ParsedInputResult } from 'Modules/parse-search-input';
import s from './bookmark.css';

import BinIcon from 'Assets/bin.svg';
import Button from 'Components/button/';
import HighlightMarkup from 'Components/highlight-markup/';
import PencilIcon from 'Assets/pencil.svg';
import Tag from 'Components/tag/';

interface Props {
	id: LocalBookmark['id'];
	title: LocalBookmark['title'];
	url: LocalBookmark['url'];
	desc: LocalBookmark['desc'];
	tags: LocalBookmark['tags'];
	parsedFilter: ParsedInputResult;
	isFocused: boolean;
	openBookmark(id: LocalBookmark['id']): void;
	onEdit(id: LocalBookmark['id']): void;
	onDelete(id: LocalBookmark['id']): void;
	forwardedRef?: Ref<HTMLElement>;
}

const Bookmark = memo<Props>((props) => {
	const handleClick = () => {
		props.openBookmark(props.id);
	};

	const handleEdit = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.stopPropagation();

		props.onEdit(props.id);
	};

	const handleDelete = (evt: MouseEvent<HTMLButtonElement>) => {
		evt.stopPropagation();

		props.onDelete(props.id);
	};

	return (
		<li
			className={cn(s.bookmark, { [s['bookmark--focused']]: props.isFocused })}
			onClick={handleClick}
			ref={props.forwardedRef as Ref<HTMLLIElement>}
		>
			<header>
				<h1 className={s.name}>
					<HighlightMarkup str={props.title} match={[props.parsedFilter.name, ...props.parsedFilter.wildcard]} />
				</h1>

				<ul className={s.tags}>
					&nbsp;
					{props.tags.map(tag => (
						<Tag
							key={tag}
							id={tag}
							label={<HighlightMarkup str={tag} match={[...props.parsedFilter.tags, ...props.parsedFilter.wildcard]} />}
						/>
					))}
				</ul>

				<div className={s.controls}>
					<Button
						onClick={handleEdit}
						type="button"
						iconHTML={PencilIcon}
						tooltip="Edit bookmark"
						className={s.edit}
						tooltipClassName={s.tooltip}
					/>

					<Button
						onClick={handleDelete}
						type="button"
						iconHTML={BinIcon}
						tooltip="Delete bookmark"
						className={s.delete}
						tooltipClassName={s.tooltip}
					/>
				</div>
			</header>

			{props.desc && (
				<p className={s.desc}>
					&#x3E; <HighlightMarkup str={props.desc} match={[...props.parsedFilter.desc, ...props.parsedFilter.wildcard]} />
				</p>
			)}

			<h2 className={s.url}>
				<HighlightMarkup str={props.url} match={[...props.parsedFilter.url, ...props.parsedFilter.wildcard]} />
			</h2>
		</li>
	);
});

export default forwardRef((props: Props, ref?: Ref<HTMLElement>) => (
	<Bookmark forwardedRef={ref} {...props} />
));
