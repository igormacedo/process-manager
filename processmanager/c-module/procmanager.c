#include <stdlib.h> // system()
#include <string.h>
#include <Python.h>

char* getCommandOutput(const char* command)
{
        FILE* fp;
        char line[128];
        char* buffer=NULL; // Buffer to store the string
        unsigned int size=1; //size initiates in 1 to account for the /0 terminator

        fp = popen(command, "r"); //Open the command for reading.
        if (fp == NULL) {
                printf("Failed to run command\n" );
                exit(1);
        }

        while (fgets(line,sizeof(line),fp))
        {
                size+=strlen(line);
                strcat(buffer=realloc(buffer,size+1),line);
                //I don't know why the size+1, but witout +1 there is a malloc problem
        }

        pclose(fp); // close

        return buffer;
}

// Function to be called from Python
static PyObject* py_processList(PyObject* self, PyObject* args)
{
        char *s = getCommandOutput("ps -au");
        return Py_BuildValue("s", s);
}

//Another function to be called from Python
static PyObject* py_myOtherFunction(PyObject* self, PyObject* args)
{
        double x, y;
        PyArg_ParseTuple(args, "dd", &x, &y);
        return Py_BuildValue("d", x*y);
}

// Bind Python function names to our C functions
static PyMethodDef procmanager_methods[] = {
        {"processList", py_processList, METH_VARARGS},
        {"myOtherFunction", py_myOtherFunction, METH_VARARGS},
        {NULL, NULL}
};

//Python calls this to let us initialize our module
PyMODINIT_FUNC
initprocmanager(void)
{
        (void) Py_InitModule("procmanager", procmanager_methods);
}
