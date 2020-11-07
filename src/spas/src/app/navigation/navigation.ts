import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'field-service',
                title    : 'Field Service',
                translate: 'NAV.FIELDSERVICE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/field-service',
                badge    : {
                    title    : '25',
                    translate: 'NAV.FIELDSERVICE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
