#include <stdio.h>
#include <stdlib.h>

int main(void){
    int MB = 0;
    while(malloc(1<<30)){
        ++MB;
    }
    printf("The number of gigs allocated is : %d\n",MB);
    return EXIT_SUCCESS;
}
