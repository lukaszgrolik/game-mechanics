import * as React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { action, makeObservable, observable } from 'mobx';
import { observer } from "mobx-react-lite";
import styled from '@emotion/styled';

import * as random from '../random';
import * as Store from '../store/store';
import { geneticAlgorithm } from './genetic-algorithm';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const signsArr = `${alphabet} `.split('');

const Wrapper = styled.div`

`;

export const GaView: React.FC<{ store: Store.Store }> = observer(({ store }) => {
    React.useEffect(() => {
        const wantedText = 'some text';

        geneticAlgorithm({
            population: 1000,
            startValue: '',
            callbackEveryIteration: 10,
            calcFitness: (currentValue) => {
                let currentFitness = 0;

                currentFitness = -1 * Math.abs(currentValue.length - wantedText.length);

                for (let i = 0; i < currentValue.length; i++) {
                    const char = currentValue[i];

                    if (char === wantedText[i]) {
                        currentFitness += 10;
                    }
                }

                return currentFitness;
            },
            canMutate: () => {
                return Math.random() < .2;
            },
            mutate: (currentValue) => {
                const chars = currentValue.split('');

                if (chars.length !== wantedText.length) {
                    // [step] add chars
                    if (random.range(1, 10) === 1) {
                        const amount = random.range(1, 2);

                        // select how many
                        for (let i = 0; i < amount; i++) {
                            // select at which positions
                            const index = random.range(0, chars.length);
                            const newChar = random.sample(signsArr);

                            chars.splice(index, 0, newChar);
                        }
                    }

                    // [step] remove char
                    if (chars.length > 0 && random.range(1, 10) === 1) {
                        const amount = Math.min(chars.length, random.range(1, 2));

                        // select how many
                        for (let i = 0; i < amount; i++) {
                            // select at which positions
                            const index = random.range(0, chars.length);

                            chars.splice(index, 1);
                        }
                    }
                }

                {
                    // [step] change chars value
                    const incorrectCharsIndexes = chars.map((char, i) => {
                        return [char, i] as [string, number];
                    })
                        .filter(([char, i]) => {
                            return char !== wantedText[i];
                        })
                        .map(val => val[1])

                    // select how many
                    const amount = random.range(0, incorrectCharsIndexes.length)
                    // select at which positions
                    const indexes = random.samples(incorrectCharsIndexes, amount);

                    for (let i = 0; i < indexes.length; i++) {
                        const index = indexes[i];

                        chars[index] = random.sample(signsArr);
                    }
                }

                return chars.join('');
            },
            onGeneration: opts => {
                console.log('iteration done', opts.generation, opts.meanFitness, opts.bestFitted.slice());

                return opts.generation > 100_000 || (opts.bestFitted.length > 0 && opts.bestFitted[opts.bestFitted.length - 1].value === wantedText);
            },
            onNewBestFitted: (currentIteration, bestFittedArr) => {
                console.log('new best fitted', currentIteration, bestFittedArr.slice());
            },
        })
    }, []);

    return (
        <Wrapper>

        </Wrapper>
    );
});