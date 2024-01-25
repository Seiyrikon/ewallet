package ewallet.backend.dto.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ewallet.backend.dao.tbl_chatDao;
import ewallet.backend.dao.tbl_chat_historyDao;
import ewallet.backend.dto.ChatHistoryDto;
import ewallet.backend.dto.ChatSessionDto;
import ewallet.backend.model.tbl_chat_history;
import ewallet.backend.service.ChatFeatureService;

@Service
public class ChatHistoryDtoMapper implements Function<tbl_chat_history, ChatHistoryDto> {
    @Autowired
    private ChatFeatureService chatFeatureService;

    @Autowired
    private tbl_chat_historyDao tbl_chat_historyDao;

    @Autowired
    private tbl_chatDao tbl_chatDao;

    @Autowired
    private ChatSessionDtoMapper chatSessionDtoMapper;

    @Override
    public ChatHistoryDto apply(tbl_chat_history history) {
        // ResponseEntity<Map<String, Object>> chatHistoryInfo = chatFeatureService.chats(history.getRecipient_id());
        // // Integer resultStatusCode = Integer.parseInt(chatHistoryInfo.getStatusCode().toString());
        // System.out.println("Raw Status Code" + chatHistoryInfo.getStatusCode().toString());
        // // System.out.println("Parsed Status Code" + resultStatusCode);
        // Object messageObject = chatHistoryInfo.getBody().get("message");

        // List<ChatSessionDto> messageList;
        // if (messageObject instanceof List) {
        //     messageList = (List<ChatSessionDto>) messageObject;
        // } else {
        //     // If it's not a List, create a list with a single element
        //     messageList = new ArrayList<>();
        //     messageList.add((ChatSessionDto) messageObject);
        // }

        // ChatSessionDto lastChatSession = messageList.isEmpty() ? null : messageList.get(messageList.size() - 1);

        // String lastMessage = (lastChatSession != null) ? lastChatSession.message() : null;
        // Timestamp lastMessageCreatedAt = (lastChatSession != null) ? lastChatSession.created_at() : null;

        List<ChatSessionDto> chatSessions = tbl_chatDao.getChatSession(history.getUser_id(), history.getRecipient_id())
        .stream()
        .map(chatSessionDtoMapper).collect(Collectors.toList());

        ChatSessionDto lastChatSession = chatSessions.isEmpty() ? null : chatSessions.get(chatSessions.size() - 1);

        history.setLast_message(lastChatSession.message());
        history.setCreated_at(lastChatSession.created_at());

        return new ChatHistoryDto(
            history.getUser_id(),
            history.getRecipient_id(),
            history.getUsername(),
            history.getFirst_name(),
            history.getMiddle_name(),
            history.getLast_name(),
            history.getLast_message(),
            history.getCreated_at()
        );
    }

}
