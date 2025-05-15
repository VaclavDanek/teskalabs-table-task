import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import { UserDetailScreen } from './UserDetailScreen.jsx';

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Modules[0].I18nService.i18n.then((t) => {
			app.Router.addRoute({
				path: "/",
				end: false,
				name: t('TableScreen|Title'),
				component: TableScreen,
			});

			app.Navigation.addItem({
				name: t('TableScreen|Title'),
				icon: 'bi bi-table',
				url: "/",
			});

			app.Router.addRoute({
				path: '/user/:id',
				end: true,
				name: t('UserDetailScreen|Title'),
				component: UserDetailScreen,
			})
		})
	}
}
