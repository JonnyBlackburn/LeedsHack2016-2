# JonnyVM JS

This was a small VM I wrote during the 24hr hackathon Leeds Hack 2016.

It's written in Javascript ausing some functional programming patterns.

The instructions are (without square brackets):
+ IBX - Get from the input and put into the accumulator
+ OBX - Put whats in the accumulator into the output
+ ADD [address] - Add what is at the address to the accumulator
+ SUB [address] - Subtract what is at the address to the accumulator
+ CPYT [address] - Copy To the memory address from accumulator
+ CPYF [addresss] - Copy From the memory address to the accumulator
+ JMP [label] - Jump to the label
+ JMPZ [label] - Jump to the label if the accumulator is 0
+ JMPN [label] - Jump to the label if the accumulator is less than 0
+ I2A - Convert an integer in the accumulator to ASCII char and outputs it

There are 10 memory addresses (0 - 9)

Have a play with it [here](https://jonnyblackburn.github.io/LeedsHack2016-2/)

It's possible to get into infinite loops, so be careful.

##Sample Programs

Put all positive numbers into the outbox until a negative number is reached.

Input: *3 5 7 12 55 -1*

Instructions:

*start:<br>
IBX<br>
JMPN exit<br>
OBX<br>
JMP start<br>
exit:*<br>


Triples the input number until a negative is input.

Input: *3 6 -1*

Instructions:

*start:<br>
IBX<br>
JMPN exit<br>
CPYT 1<br>
ADD 1<br>
ADD 1<br>
OBX<br>
JMP start<br>
exit:*<br>