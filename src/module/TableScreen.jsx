import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import { DataTableCard2, DateTime, DataTableFilter2, DataTableSort2 } from 'asab_webui_components';

//* utils
import { filterData, sortData } from '../utils'

export function TableScreen(props) {
	const { t } = useTranslation();	
	const [urlSearchParams, setUrlSearchParams] = useSearchParams();
	const navigate = useNavigate();

	//* state
	const [hoveredUserId, setHoveredUserId] = useState(null);

	const loader = async ({ params }) => {
		try {
			const response = await axios.get('https://devtest.teskalabs.com/data', { params });
			const { data, count } = response.data;
			const { f: filter } = params;

			const rows = filterData(data, ['username', 'email'], filter);
			sortData(rows, Object.entries(params).filter(([param]) => param.startsWith('s')));
			return { count, rows };
		}
		catch (e) {	throw e	}
	}

	const Header = () => (
		<>
			<div className='flex-fill'>
				<h3>
					<i className='bi bi-people-fill pe-2' />
					{t('TableScreen|Title')}
				</h3>
			</div>
			<DataTableFilter2 />
			<button 
				type='button'
				className='btn btn-danger'
				onClick={() => {
					urlSearchParams.delete('f')
					setUrlSearchParams(urlSearchParams);
				}}
			>{t('General|Cancel')}</button>
		</>
	);

	const columns = [
		{
			title: t('General|Username'),
			sort: 'username',
			tdStyle: { verticalAlign: 'middle' },
			render: ({ row }) => {
				const { id, username } = row;
				return (
					<div 
						onMouseEnter={() => setHoveredUserId(id)}
						onMouseLeave={() => setHoveredUserId(null)}
					>{hoveredUserId === id ? id : username}</div>
				)
			}
		},
		{
			title: t('Genera|Email'),
			tdStyle: { verticalAlign: 'middle' },
			render: ({ row }) => row.email
		},
		{
			title: t('General|Created at'),
			sort: 'created',
			tdStyle: { verticalAlign: 'middle' },
			render: ({ row }) => <DateTime value={row.created}/>
		},
		{
			title: t('General|Last signed in'),
			sort: 'last_sign_in',
			tdStyle: { verticalAlign: 'middle' },
			render: ({ row }) => <DateTime value={row.last_sign_in}/>
		},
		{
			title: t('General|Address'),
			tdStyle: { verticalAlign: 'middle' },
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
		}
	];

	return (
		<Container className='h-100'>
			<DataTableCard2 
				header={<Header/>}
				columns={columns}
				loader={loader}
			/>
		</Container>
	);
}
