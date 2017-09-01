from distutils.core import setup, Extension

module1 = Extension('procmanager', sources = ['procmanager.c'])

setup (name = 'Procmanager',
        version = '0.1',
        description = 'This is a demo package',
        ext_modules = [module1])
