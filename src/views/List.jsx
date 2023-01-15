import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((list) => {
					return <ListItem name={list.name} key={list.id} />;
				})}
			</ul>
		</>
	);
}
