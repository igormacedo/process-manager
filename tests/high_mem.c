#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void){
    int MB = 0;

    while(malloc(1<<30)){
        ++MB;
    }

    printf("The number of gigs allocated is : %d\n",MB);

	while(1) {
		sleep(1);
	}

    return EXIT_SUCCESS;
}
