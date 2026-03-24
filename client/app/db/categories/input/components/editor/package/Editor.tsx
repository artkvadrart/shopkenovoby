/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import {ClickableLinkPlugin} from '@lexical/react/LexicalClickableLinkPlugin';
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {SelectionAlwaysOnDisplay} from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CAN_USE_DOM} from './shared/src/canUseDOM';

import {createWebsocketProvider} from './collaboration';
import {useSettings} from './context/SettingsContext';
import {useSharedHistoryContext} from './context/SharedHistoryContext';

import AutocompletePlugin from './plugins/AutocompletePlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import ExcalidrawPlugin from './plugins/ExcalidrawPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import InlineImagePlugin from './plugins/InlineImagePlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import {LayoutPlugin} from './plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import {MaxLengthPlugin} from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import PollPlugin from './plugins/PollPlugin';
import ShortcutsPlugin from './plugins/ShortcutsPlugin';
import SpecialTextPlugin from './plugins/SpecialTextPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TableHoverActionsPlugin from './plugins/TableHoverActionsPlugin';
import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import ContentEditable from './ui/ContentEditable';
import { EditorState, TextNode, type EditorThemeClasses, type LexicalEditor, type SerializedEditorState, type SerializedLexicalNode } from 'lexical';
import {$generateHtmlFromNodes} from '@lexical/html';
import { iFromEditorJson } from '@/types';

const skipCollaborationInit =
  // @ts-expect-error
  window.parent != null && window.parent.frames.right === window;

export default function Editor(
   {
    languageCodeProps,    
    fromEditorJsonProps,
    setFromEditorJsonProps,
 //   fromEditorLngJsonProps,
    setFromEditorLngJsonProps,
    updateStateProps }: 
   {
    languageCodeProps: string,    
    fromEditorJsonProps: iFromEditorJson[] | undefined,
    setFromEditorJsonProps(value: iFromEditorJson[] | undefined):  void,
 //   fromEditorLngJsonProps: iFromEditorJson[],
    setFromEditorLngJsonProps(dataToSave: EditorState, lng: string) : void
    updateStateProps: boolean}
): JSX.Element {
  const {historyState} = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      hasLinkAttributes,
      isCharLimitUtf8,
      isRichText,
      showTreeView,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      shouldPreserveNewLinesInMarkdown,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
      shouldAllowHighlightingWithBrackets,
      selectionAlwaysOnDisplay,
    },
  } = useSettings();
  const isEditable = useLexicalEditable();
  const placeholder = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();  
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
 // const [fromEditorLocalJson, setFromEditorLocalJson] = useState<iFromEditorJson[]>([{[languageCodeProps]: JSON.stringify(editor.getEditorState())} ])

   // working ********************
  // editor.registerUpdateListener(({editorState}) => {
  //   editorState.read(() => {
  //   // let  htmlContentString = $generateHtmlFromNodes(editor, null); // null for converting the entire content
  //   // setFromEditorProps(htmlContentString)

  //   const serializedState  = editorState.toJSON();
  //   // console.log('serializedState', serializedState);
  //   const jsonString = JSON.stringify(serializedState);
  //      console.log('jsonString', jsonString);
  //   // const fromEditorJson: iFromEditorJson = { "lng": JSON.stringify(languageCodeProps), "json": jsonString }   // : iFromEditorJson
  //   const itemFromEditorJson: iFromEditorJson = { [languageCodeProps]: jsonString }   //  iFromEditorJson:  [key: string]: string
  //      console.log('fromEditorJson', languageCodeProps, itemFromEditorJson);
  //      console.log('fromEditorJsonProps', languageCodeProps, fromEditorJsonProps);

  //   if (!fromEditorJsonProps) {
  //     setFromEditorJsonProps([itemFromEditorJson]);
  //   }
  //   else{
  //     const index = fromEditorJsonProps?.findIndex(item => item[languageCodeProps] === itemFromEditorJson[languageCodeProps]);
  //     console.log('index', index);
  //     if (index !== -1) { // Проверяем, найден ли элемент
  //       index && fromEditorJsonProps?.splice(index, 1, itemFromEditorJson); // Заменяем 1 элемент по индексу на newObject
  //       setFromEditorJsonProps([...fromEditorJsonProps])
  //     }
  //     else {
  //       setFromEditorJsonProps([...fromEditorJsonProps, itemFromEditorJson])
  //     }
  //   }
  //     // if (!fromEditorJsonProps) {
  //     //   setFromEditorJsonProps([itemFromEditorJson]);
  //     // }
  //     // else {
  //     //   // const index = fromEditorJsonProps?.findIndex(item => item[languageCodeProps] === fromEditorJson.[languageCodeProps]);
  //     //   // console.log('index', index);
  //     //   if (index !== -1) { // Проверяем, найден ли элемент
  //     //     index && fromEditorJsonProps?.splice(index, 1, fromEditorJson); // Заменяем 1 элемент по индексу на newObject
  //     //     setFromEditorJsonProps([...fromEditorJsonProps])
  //     //   }
  //     //   else {
  //     //     setFromEditorJsonProps([...fromEditorJsonProps, fromEditorJson])
  //     //   }
  //     // }
  //   });
  // });
// ******************


// const dataEditor = JSON.stringify(editor.getEditorState())

// const dataEditorWithoutLng = () => {
//   const dataEditorWithoutLng = JSON.stringify(editor.getEditorState())
//       console.log('index', dataEditorWithoutLng);
//   const itemFromEditorLngJson: iFromEditorJson =   {[languageCodeProps]: dataEditorWithoutLng}     //  iFromEditorJson:  [key: string]: string
//     console.log('index', itemFromEditorLngJson);
//      if (!fromEditorLngJsonProps) { // Проверяем, есть ли данные fromEditorLngJsonProps
//       return [itemFromEditorLngJson]
//     }
//     else {
//       const index = fromEditorLngJsonProps?.findIndex(item => item[languageCodeProps] === itemFromEditorLngJson[languageCodeProps]); // Массив есть. Ищем обеъект с текущим Lng
//       console.log('index', index);
//       if (index !== -1) { // Проверяем, найден ли элемент
//         let newFromEditorLngJson = [...fromEditorLngJsonProps]

//         index && newFromEditorLngJson?.splice(index, 1, itemFromEditorLngJson); // Заменяем 1 элемент по индексу на newObject
//         return [...newFromEditorLngJson]
//       }
//       else {
//         return [...fromEditorLngJsonProps, itemFromEditorLngJson]
//       }
//     }
// }

// console.log("JSON.stringify(editor.getEditorState())",JSON.stringify(editor.getEditorState()));
// setFields(prev => ({  ...prev,   [name]: value   }));// [name] - это имя поля (динамически)
   


// useEffect(() => {
// //  const setDataEditorLngJsonProps : iFromEditorJson[] = dataEditorWithoutLng()
// //  console.log("setDataEditorLngJsonProps", setDataEditorLngJsonProps);
// // setFromEditorLocalJson([...setDataEditorLngJsonProps])
// // console.log("8888888888888888888888888888888888", fromEditorLocalJson);

// const GetEiditorSt = JSON.stringify(editor.getEditorState())
// //setFromEditorLngJsonProps( [{[languageCodeProps]: JSON.stringify(editor.getEditorState())} ] )
// //setFromEditorLngJsonProps(prev : iFromEditorJson[] => [...prev, {[languageCodeProps]: JSON.stringify(editor.getEditorState() )}])
// //setFromEditorLngJsonProps(prev : iFromEditorJson[] => [...prev, {[languageCodeProps]: JSON.stringify(editor.getEditorState() )},])

// // setFromEditorLngJsonProps((prev : iFromEditorJson[]) => [...prev, {[languageCodeProps] : GetEiditorSt}])
// //  setFromEditorLngJsonProps([...fromEditorLngJsonProps, {[languageCodeProps] : GetEiditorSt}])
//   setFromEditorLngJsonProps(GetEiditorSt, languageCodeProps)

// // setFromEditorLngJson(prevItems => [...prevItems, {[lang.code]: ''}])
// // console.log("ОООТТТРРРААББОООТТТААЛЛЛ setFromEditorLngJsonProps", fromEditorLngJsonProps);
// //setItems(prevItems => [...prevItems, `Новый элемент ${prevItems.length + 1}`]);  }

// },[])


useEffect(() => {
// const setDataEditorLngJsonProps : iFromEditorJson[] = dataEditorWithoutLng()
// console.log("setDataEditorLngJsonProps", setDataEditorLngJsonProps);
// setFromEditorLocalJson([...setDataEditorLngJsonProps])
// console.log("8888888888888888888888888888888888", fromEditorLocalJson);

// const GetEiditorSt = JSON.stringify(editor.getEditorState()) //!!!!!!!!!!!!!!!!!!!working
const GetEiditorSt = editor.getEditorState() //!!!!!!!!!!!!!!!!!!!working


// setFromEditorLngJsonProps( [...setDataEditorLngJsonProps] )
// console.log("ОООТТТРРРААББОООТТТААЛЛЛ setFromEditorLngJsonProps", fromEditorLngJsonProps);
//  setFromEditorLngJsonProps([...fromEditorLngJsonProps, {[languageCodeProps] : GetEiditorSt}])
  setFromEditorLngJsonProps(GetEiditorSt, languageCodeProps)


},[updateStateProps])





  // const Array = [{[languageCodeProps]: historyState}, {[languageCodeProps]: historyState} ];

//   editor.registerTextContentListener(
//   (textContent) => {
//     editor.read(() => {
//     let  htmlContentString = $generateHtmlFromNodes(editor, null); // null for converting the entire content
//     setFromEditorProps(htmlContentString)
//     const jsonEditor = editor.toJSON();
//     setFromEditorJsonProps(jsonEditor);
//     });
//     console.log(textContent);
//   },
// );

//   editor.addListener('update', ({editorState}) => {
//   const text = editorState.read($textContent);
//   // text === 're-modified'
// });


  // const convertLexicalToHtml  = (editor: LexicalEditor) => {
  //   let htmlString = '';     
  //   editor.update(() => {
  //     htmlString = $generateHtmlFromNodes(editor, null); // null for converting the entire content
  //   }, {discrete: true});  
  //     return htmlString;
  // }; 

  // useEffect(() => {
  //   //HTML
  //   const htmlContent = convertLexicalToHtml(editor); 
  //   setFromEditorProps(htmlContent);
  //   //JSON
  //   const editorState = editor.getEditorState();
  //   const jsonEditor = editorState.toJSON();
  //   setFromEditorJsonProps(jsonEditor);            
  // }, [updateStateProps]);  


  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      {isRichText && (
        <ToolbarPlugin  
          languageCodeProps={languageCodeProps}                
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      )}
      {isRichText && (
        <ShortcutsPlugin
          editor={activeEditor}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      )}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />
        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />       
        {isRichText ? (
          <>
            {isCollab ? (
              <CollaborationPlugin
                id="main"
                providerFactory={createWebsocketProvider}
                shouldBootstrap={!skipCollaborationInit}
              />
            ) : (
              <HistoryPlugin externalHistoryState={historyState} />
            )}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable placeholder={placeholder} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
              hasHorizontalScroll={tableHorizontalScroll}
            />
            <TableCellResizer />
            <ImagesPlugin languageCodeProps={languageCodeProps} />
            <InlineImagePlugin />
            <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            <ClickableLinkPlugin disabled={isEditable} />
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin maxIndent={7} />
            <CollapsiblePlugin />
            <PageBreakPlugin />
            <LayoutPlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableCellActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
                <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable placeholder={placeholder} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={5}
          />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
 
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}
