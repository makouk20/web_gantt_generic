# -*- coding: utf-8 -*-
{
    'name': "web_gan_generic",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Maki Turki",
    'website': "http://www.yourcompany.com",

    'category': 'sale',
    'version': '1.0',
    'application': True,

    # any module necessary for this one to work correctly
    'depends': ['base', 'web_gantt','project_enterprise','web'],

    # always loaded
    'data': [
        'views/project_gantt.xml',
        'views/assets.xml',

    ],
    'qweb': [
        'static/src/xml/web_gantt.xml',
    ]

}
