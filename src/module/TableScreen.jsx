import React, { useState, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import { DataTableCard2, DateTime, DataTableSort2 } from 'asab_webui_components';

//* components
import { TableHeader } from '../components';

//* hooks
import { useUsers } from '../api/hooks/useUsers';

export function TableScreen(props) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { fetchUsers: tableLoader } = useUsers();

	//* constants
	const GENERAL_CELL_STYLE = { verticalAlign: 'middle' };

	const UserCell = memo(({ id, username }) => {
		const [content, setContent] = useState(username);
		return (
			<div 
				onMouseEnter={() => setContent(id)}
				onMouseLeave={() => setContent(username)}
			>{content}</div>
		);
	});

	const tableColumns = useMemo(() => [
		{
			title: t('General|Username'),
			sort: 'username',
			tdStyle: GENERAL_CELL_STYLE,
			render: ({ row }) => <UserCell id={row.id} username={row.username} />
		},
		{
			title: t('General|Email'),
			tdStyle: GENERAL_CELL_STYLE,
			render: ({ row }) => row.email
		},
		{
			title: t('General|Created at'),
			sort: 'created',
			tdStyle: GENERAL_CELL_STYLE,
			render: ({ row }) => <DateTime value={row.created}/>
		},
		{
			title: t('General|Last signed in'),
			sort: 'last_sign_in',
			tdStyle: GENERAL_CELL_STYLE,
			render: ({ row }) => <DateTime value={row.last_sign_in}/>
		},
		{
			title: t('General|Address'),
			tdStyle: GENERAL_CELL_STYLE,
			render: ({ row }) => row.address
		},
		{
			thStyle: { width: '0px' },
			tdStyle: { 
				padding: '0px', 
				whiteSpace: 'nowrap',
				verticalAlign: 'middle',
			},
			render: ({ row }) => (
				<button 
					className='btn btn-primary' 
					onClick={() => navigate(`/user/${row.id}`)}
				><i className='bi bi-person-vcard-fill fs-4' /></button>
			)
		},
	], [t, navigate]);

	return (
		<Container className='h-100'>
			<DataTableCard2 
				header={
					<TableHeader 
						titleKey='TableScreen|Title'  
						showFilter={true}
					/>
				}
				columns={tableColumns}
				loader={tableLoader}
			/>
		</Container>
	);
}
