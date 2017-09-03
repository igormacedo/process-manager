#define _GNU_SOURCE
#include <signal.h> // definição dos sinais de interrupções
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h> // system()
#include <sched.h>
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
                strcat(buffer=realloc(buffer,size+10),line);
                //I don't know why the size+1, but witout +1 there is a malloc problem
        }

        pclose(fp); // close

        return buffer;
}

// Function to be called from Python
static PyObject* py_processList(PyObject* self, PyObject* args)
{
        char *command_arg;
        PyArg_ParseTuple(args, "s", &command_arg);

        char *s = getCommandOutput(command_arg);
        
		return Py_BuildValue("s", s);
}

static PyObject* py_killProcess(PyObject* self, PyObject* args)
{
	int result = 1;
	int pid, option;
	PyArg_ParseTuple(args, "ii", &pid, &option);
	
	switch(option) {
		case 1:
			kill(pid, SIGKILL);
			result = 0;
			break;
		case 2:
			kill(pid, SIGSTOP);
			result = 0;
			break;
		case 3:
			kill(pid, SIGCONT);
			result = 0;
			break;
	}

	return Py_BuildValue("i", result);
}

static PyObject* py_setCpu(PyObject* self, PyObject* args)
{
	int result = 0;
	int pid, cpu_number;
	cpu_set_t mask;
	
	PyArg_ParseTuple(args, "ii", &pid, &cpu_number);
	
	CPU_ZERO(&mask);
	CPU_SET(cpu_number, &mask);
                
	if(sched_setaffinity(pid, sizeof(cpu_set_t), &mask) < 0) {
    	fprintf(stderr, "Erro setando CPU\n");
		result = 1;
    }
    
	return Py_BuildValue("i", result);
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
		{"killProcess", py_killProcess, METH_VARARGS},
		{"setCpu", py_setCpu, METH_VARARGS},
        {"myOtherFunction", py_myOtherFunction, METH_VARARGS},
        {NULL, NULL}
};

//Python calls this to let us initialize our module
PyMODINIT_FUNC
initprocmanager(void)
{
        (void) Py_InitModule("procmanager", procmanager_methods);
}
