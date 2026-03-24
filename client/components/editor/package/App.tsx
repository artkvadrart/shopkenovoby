/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import {$createLinkNode} from '@lexical/link';
import {$createListItemNode, $createListNode} from '@lexical/list';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {$createHeadingNode, $createQuoteNode} from '@lexical/rich-text';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isTextNode,
  DOMConversionMap,
  TextNode,
} from 'lexical';

import {isDevPlayground} from './appSettings';
import {FlashMessageContext} from './context/FlashMessageContext';
import {SettingsContext, useSettings} from './context/SettingsContext';
import {SharedHistoryContext} from './context/SharedHistoryContext';
import {ToolbarContext} from './context/ToolbarContext';
import Editor from './Editor';
import logo from './images/logo.svg';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import DocsPlugin from './plugins/DocsPlugin';
import PasteLogPlugin from './plugins/PasteLogPlugin';
import {TableContext} from './plugins/TablePlugin';
import TestRecorderPlugin from './plugins/TestRecorderPlugin';
import {parseAllowedFontSize} from './plugins/ToolbarPlugin/fontSize';
import TypingPerfPlugin from './plugins/TypingPerfPlugin';
import Settings from './Settings';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import {parseAllowedColor} from './ui/ColorPicker';
import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { iFromEditorJson } from '@/types';

// console.warn(
//   'If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.',
// );

function $prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to the playground'));
    root.append(heading);
    const quote = $createQuoteNode();
    quote.append(
      $createTextNode(
        `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
          `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
      ),
    );
    root.append(quote);
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('The playground is a demo environment built with '),
      $createTextNode('@lexical/react').toggleFormat('code'),
      $createTextNode('.'),
      $createTextNode(' Try typing in '),
      $createTextNode('some text').toggleFormat('bold'),
      $createTextNode(' with '),
      $createTextNode('different').toggleFormat('italic'),
      $createTextNode(' formats.'),
    );
    root.append(paragraph);
    const paragraph2 = $createParagraphNode();
    paragraph2.append(
      $createTextNode(
        'Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!',
      ),
    );
    root.append(paragraph2);    
  }
}

function getExtraStyles(element: HTMLElement): string {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = '';
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
}

function buildImportMap(): DOMConversionMap {
  const importMap: DOMConversionMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const {forChild} = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
}

function App( 
  {  
    languageCodeProps, 
    fromEditorJsonProps,
    setFromEditorJsonProps,
    updateStateProps }: 
  {
    languageCodeProps: string,
    fromEditorJsonProps: iFromEditorJson[]  | undefined,
    setFromEditorJsonProps(value: iFromEditorJson[] | undefined):  void,
    updateStateProps: boolean}
): JSX.Element {
  
  const {
    settings: {isCollab, emptyEditor, measureTypingPerf},
  } = useSettings();

  const initialConfig = {
    editorState: isCollab
      ? null
      : emptyEditor
      ? undefined
      : $prepopulatedRichText,
    html: {import: buildImportMap()},
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <ToolbarContext>            
            <div className="editor-shell">
              <Editor  languageCodeProps={languageCodeProps}  fromEditorJsonProps={fromEditorJsonProps} setFromEditorJsonProps={setFromEditorJsonProps} updateStateProps={updateStateProps}/>
            </div>
            <Settings />
            {isDevPlayground ? <DocsPlugin /> : null}
            {isDevPlayground ? <PasteLogPlugin /> : null}
            {isDevPlayground ? <TestRecorderPlugin /> : null}

            {measureTypingPerf ? <TypingPerfPlugin /> : null}
          </ToolbarContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PlaygroundApp(
   {
    languageCodeProps,    
    fromEditorJsonProps,
    setFromEditorJsonProps,
    updateStateProps }: 
   {
    languageCodeProps: string,    
    fromEditorJsonProps: iFromEditorJson[]  | undefined,
    setFromEditorJsonProps(value: iFromEditorJson[] | undefined):  void,
    updateStateProps: boolean}
//  {editorProps}: {editorProps:  LexicalEditor}
// {convertLexicalToHtmlProps}: {convertLexicalToHtmlProps:(editor: LexicalEditor) => string}
): JSX.Element {
  return (
    <SettingsContext>
      <FlashMessageContext>
        <App  languageCodeProps={languageCodeProps} fromEditorJsonProps={fromEditorJsonProps} setFromEditorJsonProps={setFromEditorJsonProps} updateStateProps={updateStateProps}/>
      </FlashMessageContext>     
    </SettingsContext>
  );
}
