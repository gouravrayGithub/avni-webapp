import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Admin, Resource, ListGuesser } from "react-admin";

import { authProvider } from "../rootSaga";
import { store, adminHistory } from "../store";

export class OrgManager extends Component {
    getChildContext() {
        return { store }
    }

    render() {
        return (
            <Admin authProvider={authProvider} history={adminHistory} title="Manage Organisation">
                <Resource name="users" list={ListGuesser} />
            </Admin>
        );
    }
}

OrgManager.childContextTypes = {
    store: PropTypes.object
};
