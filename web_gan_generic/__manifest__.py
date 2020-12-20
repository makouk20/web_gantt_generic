# -*- coding: utf-8 -*-
{
    'name': "web_gan_generic",
    'summary': """
        This module allow you to display any field you want in the gantt view""",
    'description': """
        This module allow you to display any field you want in the gantt view
    """,
    'author': "Maki Turki",
    'category': 'sale',
    'version': '1.0',
    'application': True,
    # any module necessary for this one to work correctly
    'depends': ['base', 'web_gantt', 'project_enterprise', 'web'],
    # always loaded
    'data': [
        'views/project_gantt.xml',
        'views/assets.xml',
    ],
    'qweb': [
        'static/src/xml/web_gantt.xml',
    ]
}
